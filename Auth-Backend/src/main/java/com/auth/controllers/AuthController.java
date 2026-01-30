package com.auth.controllers;

import com.auth.dtos.LoginRequest;
import com.auth.dtos.RefreshTokenRequest;
import com.auth.dtos.TokenResponse;
import com.auth.dtos.UserDTO;
import com.auth.entity.RefreshToken;
import com.auth.entity.User;
import com.auth.repositories.RefreshTokenRepository;
import com.auth.repositories.UserRepository;
import com.auth.security.CookieService;
import com.auth.security.JwtService;
import com.auth.services.AuthService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
    ) {
        // authenticate
       Authentication authentication =  authenticate(loginRequest);
        User user = userRepository.findByEmail(loginRequest.email()).orElseThrow(()->new BadCredentialsException("Invalid Username Or Password"));
        if(!user.isEnable()){
            throw new DisabledException("User is disabled");
        }

        String jti = UUID.randomUUID().toString();
        var refresh = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .createdAt(Instant.now())
                .expiredAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .revoked(false)
                .build();

        refreshTokenRepository.save(refresh);

        // access token generate
       String accessToken =  jwtService.generateAccessToken(user);
       String refreshToken = jwtService.generateRefreshToken(user,refresh.getJti());

       // use cookie service to attach refresh token in cookie
        cookieService.attachRefreshCookie(response,refreshToken,(int) jwtService.getRefreshTtlSeconds());
        cookieService.addNoHeaders(response);

        TokenResponse tokenResponse = TokenResponse.of(accessToken,refreshToken,jwtService.getAccessTtlSeconds(),modelMapper.map(user,UserDTO.class));
        return ResponseEntity.ok(tokenResponse);

    }

    private Authentication authenticate(LoginRequest loginRequest) {
        try{
            return  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(),loginRequest.password()));

        }catch (Exception e){
            throw new BadCredentialsException("Username or Password Invalid");
        }

    }

    // refresh and access token renew api
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(
            @RequestBody(required = false) RefreshTokenRequest body,
            HttpServletResponse response,
            HttpServletRequest request
    ){

        String refreshToken = readRefreshTokenFromRequest(body,request).orElseThrow(()->new BadCredentialsException("Refresh token is missing"));

        if(!jwtService.isRefreshToken(refreshToken)){
            throw new BadCredentialsException("Invalid Refresh Token Type");
        }
        String jti = jwtService.getJti(refreshToken);
        UUID userId = jwtService.getUserId(refreshToken);
        RefreshToken storedRefreshToken = refreshTokenRepository.findByJti(jti).orElseThrow(()-> new BadCredentialsException("Refresh Token Not Recognize"));

        if(storedRefreshToken.isRevoked()){
            throw new BadCredentialsException("Refresh token is revoked");
        }
        if(storedRefreshToken.getExpiredAt().isBefore(Instant.now())){
            throw new BadCredentialsException("Refresh Token Expired");
        }

        if(!storedRefreshToken.getUser().getId().equals(userId)){
            throw new BadCredentialsException("Token subject mismatched");
        }

        // refresh token rotate
        storedRefreshToken.setRevoked(true);
        String newJti = UUID.randomUUID().toString();
        storedRefreshToken.setReplacedByToken(newJti);
        refreshTokenRepository.save(storedRefreshToken);

        User user = storedRefreshToken.getUser();
        var newRefreshTokenDb =  RefreshToken.builder()
                .jti(newJti)
                .user(user)
                .createdAt(Instant.now())
                .expiredAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .revoked(false)
                .build();

        refreshTokenRepository.save(newRefreshTokenDb);
        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user,newRefreshTokenDb.getJti());
        cookieService.attachRefreshCookie(response,newRefreshToken,(int)jwtService.getRefreshTtlSeconds());
        cookieService.addNoHeaders(response);
        return ResponseEntity.ok(TokenResponse.of(newAccessToken,newRefreshToken,jwtService.getAccessTtlSeconds(),modelMapper.map(user,UserDTO.class)));



    }

    // logout
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request,HttpServletResponse response){
        readRefreshTokenFromRequest(null,request).ifPresent(token->{
            try{
                if(jwtService.isRefreshToken(token)){
                    String jti = jwtService.getJti(token);
                    refreshTokenRepository.findByJti(jti).ifPresent(rt->{
                        rt.setRevoked(true);
                        refreshTokenRepository.save(rt);
                    });
                }
            }catch (JwtException ignored){

            }

        });
        cookieService.clearRefreshCookie(response);
        cookieService.addNoHeaders(response);
        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


    // this method will read refresh token from the header or body
    private Optional<String> readRefreshTokenFromRequest(RefreshTokenRequest body, HttpServletRequest request) {
        // 1. prefer reading refresh token from cookie
        if(request.getCookies() != null){
            Optional<String> fromCookie = Arrays.stream(request.getCookies())
                    .filter(c->cookieService.getRefreshTokenCookieName().equals(c.getName()))
                    .map(Cookie::getValue)
                    .filter(v->v != null && !v.isBlank())
                    .findFirst();



            if(fromCookie.isPresent()){
                return fromCookie;
            }
        }
        // 2. body
        if(body != null && body.refreshToken() != null && !body.refreshToken().isBlank()){
            return Optional.of(body.refreshToken());
        }

        // custom header
        String refreshHeader = request.getHeader("X-Refresh-Token");
        if(refreshHeader != null && !refreshHeader.isBlank()){
            return Optional.of(refreshHeader.trim());
        }

        // Authorization -- Bearer <Token>
//        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//        if(authHeader != null && authHeader.regionMatches(true,0,"Bearer ")){
//
//        }
        return Optional.empty();

    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userDTO));
    }

}
