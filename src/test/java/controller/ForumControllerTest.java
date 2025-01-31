package controller;

import com.forum.ForumApplication;
import com.forum.repository.ForumRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = ForumApplication.class)
@AutoConfigureMockMvc
public class ForumControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ForumRepository forumRepository;

    @BeforeEach
    public void setUp() {
        forumRepository.deleteAll(); // Bereinigt die Datenbank vor jedem Test
    }

    @Test
    public void testCreateForum() throws Exception {
        String forumJson = "{\"title\": \"Test Forum\", \"description\": \"This is a test forum.\"}";

        mockMvc.perform(post("/api/forums")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer your_test_token") // Falls Auth verwendet wird
                        .content(forumJson))
                .andExpect(status().isOk());
    }
}
