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

    public List<Forum> getAllForums() {
        return forumRepository.findAll();
    }

    public Forum getForumById(Long id) {
        return forumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Forum not found"));
    }

    public Forum createForum(Forum forum) {
        return forumRepository.save(forum);
    }

    public void deleteForum(Long id) {
        forumRepository.deleteById(id);
    }
}
