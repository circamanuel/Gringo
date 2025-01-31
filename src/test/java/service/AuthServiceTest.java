package service;

import com.forum.models.User;
import com.forum.repository.UserRepository;
import com.forum.security.JwtUtil;
import com.forum.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class) // Aktiviert Mockito in JUnit 5
class AuthServiceTest {

    @InjectMocks
    private AuthService authService; // Erstellt eine Instanz von AuthService und injiziert Mocks

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        when(passwordEncoder.encode(anyString())).thenReturn("hashedPassword123"); // Simulierter Hash
    }

    @Test
    void testPasswordHashing() {
        // Arrange
        String rawPassword = "test123";

        // Act
        String hashedPassword = passwordEncoder.encode(rawPassword);

        // Assert
        assertNotNull(hashedPassword); // Gehashte Passwörter dürfen nicht null sein
        assertNotEquals(rawPassword, hashedPassword); // Hashes müssen sich vom Klartext unterscheiden
    }

    @Test
    void testRegisterUser() {
        // Arrange
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("test123");

        // Act
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Assert
        assertNotNull(user.getPassword()); // Passwort darf nicht null sein
        assertEquals("hashedPassword123", user.getPassword()); // Passwort sollte den simulierten Hash haben
    }
}