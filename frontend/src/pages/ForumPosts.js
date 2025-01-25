import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostsByForum, createPost } from '../services/api';

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
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <p>{post.content}</p>
                        <small>Created by: {post.createdBy}</small>
                    </li>
                ))}
            </ul>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a post..."
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ForumPosts;
