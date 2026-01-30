package com.auth.dtos;

public record TokenResponse(
        String accesstoken,
        String refreshToken,
        long expireIn,
        String tokenType,
        UserDTO user
) {

    public static TokenResponse of(String accesstoken,String refreshToken,long expireIn, UserDTO user){
        return new TokenResponse(accesstoken,refreshToken,expireIn,"Bearer",user);
    }

}
