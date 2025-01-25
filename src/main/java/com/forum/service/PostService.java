package com.forum.service;

import com.forum.dto.PostDTO;
import com.forum.models.Forum;
import com.forum.models.Post;
import com.forum.models.User;
import com.forum.repository.PostRepository;
import com.forum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new post
    public Post createPost(PostDTO postDTO) {
        User user = userRepository.findByUsername(postDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setContent(postDTO.getContent());
        post.setUser(user);
        post.setForum(new Forum(postDTO.getForumId())); // Assuming Forum is already fetched
        return postRepository.save(post);
    }

    // Update an existing post
    public Post updatePost(Long postId, PostDTO postDTO) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByUsername(postDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!post.getUser().equals(user) && !user.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("Unauthorized");
        }

        post.setContent(postDTO.getContent());
        return postRepository.save(post);
    }

    // Delete a post
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    // Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Get posts by forum
    public List<Post> getPostsByForum(Long forumId) {
        Forum forum = new Forum(forumId); // Assuming Forum has a constructor accepting ID
        return postRepository.findByForum(forum);
    }

    // Get posts by user
    public List<Post> getPostsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return postRepository.findByUser(user);
    }

    // Get a specific post by ID
    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }
}
