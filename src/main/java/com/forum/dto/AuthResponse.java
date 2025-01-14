package com.forum.dto;

public class AuthResponse {

    private String token;
    private String username;

    // Constructor
    public AuthResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }

    // Getter and Setter
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
