package com.forum.repository;

import com.forum.models.Post;
import com.forum.models.Forum;
import com.forum.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Fetch posts by forum
    List<Post> findByForum(Forum forum);

    // Fetch posts by user
    List<Post> findByUser(User user);
}
