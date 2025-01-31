import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostsByUser } from '../services/api';

/**
 * UserPostList Component
 *
 * This component displays a list of posts created by a specific user.
 * It fetches posts from the API based on the username provided in the URL.
 */
const UserPostList = () => {
    // Extract the username from the URL parameters
    const { username } = useParams();

    // State to store the list of posts created by the user
    const [posts, setPosts] = useState([]);

    /**
     * useEffect Hook:
     * - Fetches posts created by the user when the component mounts.
     * - Re-fetches the data if the username changes.
     */
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const data = await fetchPostsByUser(username); // Call API to fetch user's posts
                setPosts(data); // Update the state with fetched posts
            } catch (error) {
                console.error('Error fetching user posts:', error); // Log errors if the API call fails
            }
        };

        fetchUserPosts(); // Trigger the function to fetch posts when the component mounts
    }, [username]); // Runs again if the username changes

    return (
        <div>
            {/* Display the username as a heading */}
            <h1>Posts by {username}</h1>

            {/* Conditional rendering: Check if posts exist */}
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            {/* Display post content */}
                            <h3>{post.content}</h3>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available for this user</p> // Show a message if the user has no posts
            )}
        </div>
    );
};

export default UserPostList;
