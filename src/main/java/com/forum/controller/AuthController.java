package com.forum.controller;

import com.forum.dto.AuthRequest;
import com.forum.dto.AuthResponse;
import com.forum.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        return authService.login(authRequest); // Token generieren
    }

    @PostMapping("/register")
    public void register(@RequestBody AuthRequest authRequest) {
        authService.register(authRequest); // Benutzer registrieren
    }
}
