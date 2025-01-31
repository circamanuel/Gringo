

import com.forum.ForumApplication;

import com.forum.repository.ForumRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = ForumApplication.class)
@AutoConfigureMockMvc
@Transactional // Stellt sicher, dass Tests keine DB-Probleme verursachen
public class ForumControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ForumRepository forumRepository;

    @BeforeEach
    public void setUp() {
        forumRepository.deleteAll(); // Löscht alle Daten vor jedem Test
    }

    @Test
    public void testCreateForum() throws Exception {
        String forumJson = "{\"title\": \"Test Forum\", \"description\": \"This is a test forum.\"}";

        mockMvc.perform(post("/api/forums")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer your_test_token") // Falls Auth verwendet wird
                        .content(forumJson))
                .andExpect(status().isOk()); // HTTP 200 oder anpassen, falls anderes erwartet wird
    }
}
