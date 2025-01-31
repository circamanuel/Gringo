package com.forum.service;

import com.forum.dto.CommentDTO;
import com.forum.models.Comment;
import com.forum.models.Post;
import com.forum.models.User;
import com.forum.repository.CommentRepository;
import com.forum.repository.PostRepository;
import com.forum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // Marks this class as a service component in Spring
public class CommentService {

    @Autowired
    private CommentRepository commentRepository; // Repository for handling comment data

    @Autowired
    private PostRepository postRepository; // Repository for handling post data

    @Autowired
    private UserRepository userRepository; // Repository for handling user data

    // Create a new comment
    public Comment createComment(CommentDTO commentDTO) {
        // Retrieve the post for which the comment is being made
        Post post = postRepository.findById(commentDTO.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Retrieve the user making the comment
        User user = userRepository.findByUsername(commentDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create a new Comment entity and populate it with data
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setPost(post);
        comment.setUser(user);

        return commentRepository.save(comment); // Save and return the newly created comment
    }

    // Update an existing comment
    public Comment updateComment(Long commentId, CommentDTO commentDTO) {
        // Retrieve the existing comment
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Retrieve the user requesting the update
        User user = userRepository.findByUsername(commentDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Ensure only the comment owner or an admin can update the comment
        if (!comment.getUser().equals(user) && !user.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("Unauthorized");
        }

        // Update the comment content
        comment.setContent(commentDTO.getContent());
        return commentRepository.save(comment); // Save and return the updated comment
    }

    // Delete a comment by its ID
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId); // Delete the comment from the database
    }
}
