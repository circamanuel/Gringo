package com.forum.controller;

import com.forum.models.Forum;
import com.forum.service.ForumService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    private final ForumService forumService;

    public ForumController(ForumService forumService) {
        this.forumService = forumService;
    }

    // GET: Fetch all forums
    @GetMapping
    public ResponseEntity<List<Forum>> getAllForums() {
        return ResponseEntity.ok(forumService.getAllForums());
    }

    // GET: Fetch a specific forum by ID
    @GetMapping("/{id}")
    public ResponseEntity<Forum> getForumById(@PathVariable Long id) {
        return ResponseEntity.ok(forumService.getForumById(id));
    }

    // POST: Create a new forum
    @PostMapping
    public ResponseEntity<Forum> createForum(@RequestBody Forum forum, Authentication authentication) {
        String username = (authentication != null) ? authentication.getName() : "Anonymous";
        forum.setCreatedBy(username);
        return new ResponseEntity<>(forumService.createForum(forum), HttpStatus.CREATED);
    }

    // PUT: Update an existing forum
    @PutMapping("/{id}")
    public ResponseEntity<Forum> updateForum(@PathVariable Long id, @RequestBody Forum forum, Authentication authentication) {
        Forum existingForum = forumService.getForumById(id);

        // Only allow the creator or admin to update the forum
        if (authentication == null || (!existingForum.getCreatedBy().equals(authentication.getName()) && !isAdmin(authentication))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        existingForum.setTitle(forum.getTitle());
        existingForum.setDescription(forum.getDescription());
        return ResponseEntity.ok(forumService.updateForum(existingForum));
    }

    // DELETE: Delete a forum
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteForum(@PathVariable Long id, Authentication authentication) {
        Forum forum = forumService.getForumById(id);

        // Only allow the creator or admin to delete the forum
        if (authentication == null || (!forum.getCreatedBy().equals(authentication.getName()) && !isAdmin(authentication))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        forumService.deleteForum(id);
        return ResponseEntity.noContent().build();
    }

    // Helper method to check if the user is an admin
    private boolean isAdmin(Authentication authentication) {
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }
}
