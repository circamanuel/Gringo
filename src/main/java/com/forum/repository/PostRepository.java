package com.forum.repository;

import com.forum.models.Post;
import com.forum.models.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByForum(Forum forum);
}
