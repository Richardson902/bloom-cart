package com.example.bloomcart.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class JwtKeyReader {
    private static final String SECRET_KEY_PATH = "/app/jwt-secret.key";

    public static String getSecretKey() {
        try {
            return new String(Files.readAllBytes(Paths.get(SECRET_KEY_PATH))).trim();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read JWT secret key: " + e.getMessage());
        }
    }
}
