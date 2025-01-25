import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostsByUser } from '../services/api';

const UserPostList = () => {
    const { username } = useParams(); // Get username from the URL
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const data = await fetchPostsByUser(username); // Fetch posts by user
                setPosts(data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [username]);

    return (
        <div>
            <h1>Posts by {username}</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.content}</h3>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available for this user</p>
            )}
        </div>
    );
};

export default UserPostList;
