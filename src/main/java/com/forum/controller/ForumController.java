package com.forum.controller;

import com.forum.exception.UnauthorizedException;
import com.forum.models.Forum;
import com.forum.service.ForumService;
import com.forum.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    private final ForumService forumService;
    private final UserService userService;

    public ForumController(ForumService forumService, UserService userService) {
        this.forumService = forumService;
        this.userService = userService;
    }

    // GET: Alle Foren abrufen
    @GetMapping
    public ResponseEntity<List<Forum>> getAllForums() {
        return ResponseEntity.ok(forumService.getAllForums());
    }

    // GET: Ein Forum abrufen
    @GetMapping("/{id}")
    public ResponseEntity<Forum> getForumById(@PathVariable Long id) {
        return ResponseEntity.ok(forumService.getForumById(id));
    }

    // POST: Ein neues Forum erstellen
    @PostMapping
    public ResponseEntity<Forum> createForum(@RequestBody Forum forum, Authentication authentication) {
        forum.setCreatedBy(authentication.getName());
        return new ResponseEntity<>(forumService.createForum(forum), HttpStatus.CREATED);
    }

    // PUT: Ein bestehendes Forum aktualisieren
    @PutMapping("/{id}")
    public ResponseEntity<Forum> updateForum(@PathVariable Long id, @RequestBody Forum forum, Authentication authentication) {
        Forum existingForum = forumService.getForumById(id);

        // Nur der Ersteller oder ein Admin darf das Forum aktualisieren
        if (!existingForum.getCreatedBy().equals(authentication.getName()) && !isAdmin(authentication)) {
            throw new UnauthorizedException("You are not authorized to update this forum.");
        }

        existingForum.setTitle(forum.getTitle());
        existingForum.setDescription(forum.getDescription());

        return ResponseEntity.ok(forumService.createForum(existingForum));
    }

    // DELETE: Ein Forum löschen
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteForum(@PathVariable Long id, Authentication authentication) {
        Forum forum = forumService.getForumById(id);

        // Nur der Ersteller oder ein Admin darf das Forum löschen
        if (!forum.getCreatedBy().equals(authentication.getName()) && !isAdmin(authentication)) {
            throw new UnauthorizedException("You are not authorized to delete this forum.");
        }

        forumService.deleteForum(id);
        return ResponseEntity.noContent().build();
    }

    // Helper-Methode, um zu prüfen, ob der aktuelle Benutzer ein Admin ist
    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }
}
