package com.forum.service;

import com.forum.dto.PostDTO;
import com.forum.models.Forum;
import com.forum.models.Post;
import com.forum.models.User;
import com.forum.repository.PostRepository;
import com.forum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post createPost(PostDTO postDTO) {
        User user = userRepository.findByUsername(postDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setContent(postDTO.getContent());
        post.setUser(user);
        // Assuming Forum is already fetched
        post.setForum(new Forum(postDTO.getForumId()));
        return postRepository.save(post);
    }

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

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }
}
