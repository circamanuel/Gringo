package service;  // Muss exakt zum Ordner passen!

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.forum.models.User;
import com.forum.repository.UserRepository;
import com.forum.repository.PostRepository;
import com.forum.repository.CommentRepository;
import com.forum.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void createUserShouldSaveUserWithEncodedPassword() {
        // Arrange
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("rawpassword");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty()); // Username nicht vorhanden
        when(passwordEncoder.encode("rawpassword")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        // Act
        User createdUser = userService.createUser(user);

        // Assert
        assertNotNull(createdUser);
        assertEquals("testuser", createdUser.getUsername());
        assertEquals("encodedPassword", createdUser.getPassword());
        verify(userRepository).save(any(User.class));
    }


}
