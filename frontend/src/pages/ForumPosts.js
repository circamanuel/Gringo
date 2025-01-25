import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostsByForum, createPost } from '../services/api';
import '../styles/App.css'; // Importiere die CSS-Datei

const ForumPosts = () => {
    const { forumId } = useParams();
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const getPosts = async () => {
            try {
                const postsData = await fetchPostsByForum(forumId);
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        getPosts();
    }, [forumId]);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost({ forumId, content });
            setContent('');
            const updatedPosts = await fetchPostsByForum(forumId);
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="forum-posts-container">
            <h1 className="forum-posts-title">Posts</h1>
            <ul className="forum-posts-list">
                {posts.map((post) => (
                    <li key={post.id} className="forum-post-item">
                        <p className="forum-post-content">{post.content}</p>
                        <small className="forum-post-author">Created by: {post.createdBy}</small>
                    </li>
                ))}
            </ul>
            <form onSubmit={handlePostSubmit} className="forum-post-form">
                <textarea
                    className="forum-post-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a post..."
                    required
                />
                <button type="submit" className="forum-post-button">Submit</button>
            </form>
        </div>
    );
};

export default ForumPosts;
