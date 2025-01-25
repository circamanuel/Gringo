package com.forum;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.forum.models.Forum;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ForumControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateForum() throws Exception {
        String token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsImlhdCI6MTY3MzU4NTYwMCwiZXhwIjoxNjczNTg5MjAwfQ.wRZy-XzjlCHj13wSScImW0lI-Mp4pY5dCGH35Zm2TxU";

        Forum forum = new Forum();
        forum.setTitle("Test Forum");
        forum.setDescription("This is a test forum.");

        mockMvc.perform(post("/api/forums")
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(forum)))
                .andExpect(status().isCreated());
    }
}
