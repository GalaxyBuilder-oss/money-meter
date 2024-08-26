package com.gb.moneymeter.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashUtil {

    // Method untuk hashing string menggunakan SHA-256
    public static String hashString(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();

            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing the string", e);
        }
    }

    // Method untuk membandingkan string dengan hasil hash
    public static boolean compareStringToHash(String original, String hash) {
        String hashedOriginal = hashString(original);
        return hashedOriginal.equals(hash);
    }
}

