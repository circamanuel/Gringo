package com.forum.service;

import com.forum.models.Forum;
import com.forum.repository.ForumRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService {

    private final ForumRepository forumRepository;

    public ForumService(ForumRepository forumRepository) {
        this.forumRepository = forumRepository;
    }

    // Get all forums
    public List<Forum> getAllForums() {
        return forumRepository.findAll();
    }

    // Get a forum by ID
    public Forum getForumById(Long id) {
        return forumRepository.findById(id).orElseThrow(() -> new RuntimeException("Forum not found"));
    }

    // Create a new forum
    public Forum createForum(Forum forum) {
        return forumRepository.save(forum);
    }

    // Update an existing forum
    public Forum updateForum(Forum forum) {
        if (!forumRepository.existsById(forum.getId())) {
            throw new RuntimeException("Forum not found");
        }
        return forumRepository.save(forum); // Save the updated forum
    }

    // Delete a forum by ID
    public void deleteForum(Long id) {
        if (!forumRepository.existsById(id)) {
            throw new RuntimeException("Forum not found");
        }
        forumRepository.deleteById(id);
    }
}
