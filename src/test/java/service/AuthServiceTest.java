package service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.forum.dto.AuthRequest;
import com.forum.dto.AuthResponse;
import com.forum.models.User;
import com.forum.repository.UserRepository;
import com.forum.security.JwtUtil;
import com.forum.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void loginShouldReturnTokenWhenCredentialsAreValid() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("encodedPassword");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("rawPassword", "encodedPassword")).thenReturn(true);
        when(jwtUtil.generateToken("testuser")).thenReturn("mockedToken");

        // Act
        AuthResponse response = authService.login(new AuthRequest("testuser", "rawPassword"));

        // Assert
        assertNotNull(response);
        assertEquals("mockedToken", response.getToken());
    }

    @Test
    void loginShouldThrowExceptionWhenUserNotFound() {
        // Arrange
        when(userRepository.findByUsername("unknownUser")).thenReturn(Optional.empty());

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () ->
                authService.login(new AuthRequest("unknownUser", "password"))
        );

        assertEquals("User not found", exception.getMessage());
    }
}
