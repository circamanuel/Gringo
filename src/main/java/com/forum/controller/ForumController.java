package com.forum.controller;

import com.forum.models.Forum;
import com.forum.service.ForumService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Marks this class as a REST controller, handling API requests
@RequestMapping("/api/forums") // Base path for all forum-related API endpoints
public class ForumController {

    private final ForumService forumService;

    // Constructor-based dependency injection for ForumService
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
        // Retrieve the username from the authentication object (or set to "Anonymous" if not authenticated)
        String username = (authentication != null) ? authentication.getName() : "Anonymous";
        forum.setCreatedBy(username);

        // Save the new forum and return a 201 Created response
        return new ResponseEntity<>(forumService.createForum(forum), HttpStatus.CREATED);
    }

    // PUT: Update an existing forum
    @PutMapping("/{id}")
    public ResponseEntity<Forum> updateForum(@PathVariable Long id, @RequestBody Forum forum, Authentication authentication) {
        Forum existingForum = forumService.getForumById(id);

        // Only allow the creator or an admin to update the forum
        if (authentication == null || (!existingForum.getCreatedBy().equals(authentication.getName()) && !isAdmin(authentication))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Return 403 Forbidden if unauthorized
        }

        // Update forum details
        existingForum.setTitle(forum.getTitle());
        existingForum.setDescription(forum.getDescription());

        return ResponseEntity.ok(forumService.updateForum(existingForum));
    }

    // DELETE: Delete a forum
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteForum(@PathVariable Long id, Authentication authentication) {
        Forum forum = forumService.getForumById(id);

        // Only allow the creator or an admin to delete the forum
        if (authentication == null || (!forum.getCreatedBy().equals(authentication.getName()) && !isAdmin(authentication))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Return 403 Forbidden if unauthorized
        }

        forumService.deleteForum(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content upon successful deletion
    }

    // Helper method to check if the authenticated user is an admin
    private boolean isAdmin(Authentication authentication) {
        return authentication != null && authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }
}
