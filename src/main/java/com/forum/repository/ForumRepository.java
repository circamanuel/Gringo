package com.forum.repository;

import com.forum.models.Forum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumRepository extends JpaRepository<Forum, Long> {
    // Custom query methods can be added here if needed
}
