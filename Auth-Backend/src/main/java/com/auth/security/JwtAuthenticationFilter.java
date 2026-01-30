package com.auth.security;

import com.auth.entity.User;
import com.auth.helpers.UserHelper;
import com.auth.repositories.UserRepository;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {


        String header = request.getHeader("Authorization");
        logger.info("Authorization Header: {}", header);
        // check for access token

        if (header != null && header.startsWith("Bearer ")) {
            // token extract and validate and then authentication create then security context ke ander set kruga
            String token = header.substring(7);

            try {

                if (!jwtService.isAccessToken(token)) {
                    filterChain.doFilter(request, response);
                    return;
                }

                Jws<Claims> parse = jwtService.parse(token);
                Claims payload = parse.getPayload();
                String userId = payload.getSubject();
                UUID userUUID = UserHelper.parseUUID(userId);

                userRepository.findById(userUUID)
                        .ifPresent(user -> {

                            // check for user enable
                            if (user.isEnable()) {
                                // getting roles/Authorities here
                                List<GrantedAuthority> authorities = user.getRoles() == null ? List.of() :
                                        user
                                                .getRoles()
                                                .stream()
                                                .map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

                                // create authentication
                                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                        user.getEmail(),
                                        null,
                                        authorities
                                );

                                // set authentication here if it was empty
                                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                                // final line: to set the authentication to security context
                                if (SecurityContextHolder.getContext().getAuthentication() == null) {
                                    SecurityContextHolder.getContext().setAuthentication(authentication);
                                }
                            }


                        });


            } catch (ExpiredJwtException e) {
                request.setAttribute("error","Token Expired");

            } catch (Exception e) {
                request.setAttribute("error","invalid Token");

            }

        }
        // if no token is present then it forward
        filterChain.doFilter(request, response);

    }

    


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().startsWith("/api/v1/auth/");

    }
}
