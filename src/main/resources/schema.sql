CREATE TABLE IF NOT EXISTS user (
                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS forum (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
    );

CREATE TABLE IF NOT EXISTS post (
                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    content TEXT NOT NULL,
                                    forum_id BIGINT,
                                    user_id BIGINT,
                                    FOREIGN KEY (forum_id) REFERENCES forum(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
    );

CREATE TABLE IF NOT EXISTS comment (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       content TEXT NOT NULL,
                                       post_id BIGINT,
                                       user_id BIGINT,
                                       FOREIGN KEY (post_id) REFERENCES post(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
    );
