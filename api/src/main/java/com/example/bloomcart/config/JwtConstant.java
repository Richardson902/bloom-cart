package com.example.bloomcart.config;

public class JwtConstant {
    public static final String SECRET_KEY = JwtKeyReader.getSecretKey();
    public static final String JWT_HEADER = "Authorization";
}
