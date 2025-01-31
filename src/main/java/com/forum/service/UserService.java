package com.forum.service;

import com.forum.exception.ResourceNotFoundException;
import com.forum.models.User;
import com.forum.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service // Marks this class as a service component in Spring
public class UserService {

    private final UserRepository userRepository; // Repository for handling user data
    private final PasswordEncoder passwordEncoder; // Encoder for securing passwords

    // Constructor-based dependency injection
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Create a new user with an encoded password
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password before saving
        return userRepository.save(user); // Save and return the newly created user
    }

    // Retrieve a user by ID, or throw an exception if not found
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
}
