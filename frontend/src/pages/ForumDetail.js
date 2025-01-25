import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostsByForum, createPost } from '../services/api';

const ForumDetails = () => {
    const { forumId } = useParams();
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchPostsByForum(forumId);
            setPosts(data);
        };
        loadPosts();
    }, [forumId]);

    const handlePostCreation = async () => {
        await createPost({ content, forumId });
        setContent('');
        const updatedPosts = await fetchPostsByForum(forumId);
        setPosts(updatedPosts);
    };

    return (
        <div>
            <h1>Forum Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <p>{post.content}</p>
                        <small>Posted by: {post.user.username}</small>
                    </li>
                ))}
            </ul>
            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a post..."
                />
                <button onClick={handlePostCreation}>Post</button>
            </div>
        </div>
    );
};

export default ForumDetails;
