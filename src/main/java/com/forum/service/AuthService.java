package com.forum.service;

import com.forum.dto.AuthRequest;
import com.forum.dto.AuthResponse;
import com.forum.models.User;
import com.forum.repository.UserRepository;
import com.forum.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service // Marks this class as a service component in Spring
public class AuthService {

    @Autowired
    private UserRepository userRepository; // Repository for accessing user data

    @Autowired
    private JwtUtil jwtUtil; // Utility for generating JWT tokens

    @Autowired
    private PasswordEncoder passwordEncoder; // Encoder for securing passwords

    // Handles user login and JWT token generation
    public AuthResponse login(AuthRequest authRequest) {
        User user = userRepository.findByUsername(authRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found")); // Throws an error if the user does not exist

        // Validate password
        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials"); // Throw an error if the password is incorrect
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername()); // Return token and username in response
    }

    // Handles user registration
    public void register(AuthRequest authRequest) {
        User user = new User();
        user.setUsername(authRequest.getUsername());
        user.setPassword(passwordEncoder.encode(authRequest.getPassword())); // Encrypt password before saving
        user.setRole("ROLE_USER"); // Assign default role to new users
        userRepository.save(user); // Save new user to the database
    }
}
