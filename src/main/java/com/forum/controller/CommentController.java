package com.forum.controller;

import com.forum.dto.CommentDTO;
import com.forum.models.Comment;
import com.forum.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Marks this class as a REST controller, handling HTTP requests
@RequestMapping("/api/comments") // Base path for all comment-related API endpoints
public class CommentController {

    @Autowired // Automatically injects an instance of CommentService
    private CommentService commentService;

    @PostMapping // Handles HTTP POST requests to create a new comment
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok(commentService.createComment(commentDTO));
    }

    @PutMapping("/{commentId}") // Handles HTTP PUT requests to update an existing comment
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok(commentService.updateComment(commentId, commentDTO));
    }

    @DeleteMapping("/{commentId}") // Handles HTTP DELETE requests to delete a comment by its ID
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build(); // Returns a 204 No Content response
    }
}
