import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostsByForum, createPost } from '../services/api';
import '../styles/App.css'; // Import the CSS file for styling

/**
 * ForumPosts Component
 *
 * This component is responsible for displaying posts within a specific forum.
 * It allows users to fetch existing posts and create new posts in the forum.
 */
const ForumPosts = () => {
    // Extract the forum ID from the URL parameters
    const { forumId } = useParams();

    // State to store the list of posts for the forum
    const [posts, setPosts] = useState([]);

    // State to store the content of the new post being written by the user
    const [content, setContent] = useState('');

    /**
     * useEffect Hook:
     * - Fetches posts from the API when the component mounts or when the forum ID changes.
     * - Calls `fetchPostsByForum(forumId)`, which retrieves all posts associated with the given forum ID.
     */
    useEffect(() => {
        const getPosts = async () => {
            try {
                const postsData = await fetchPostsByForum(forumId);
                setPosts(postsData); // Update the state with fetched posts
            } catch (error) {
                console.error('Error fetching posts:', error); // Log error if fetching fails
            }
        };

        getPosts(); // Trigger the function to fetch posts when the component mounts
    }, [forumId]); // Runs again if the forum ID changes

    /**
     * Handles the submission of a new post.
     * - Prevents default form submission behavior.
     * - Calls `createPost` API function to submit the new post.
     * - Clears the input field after a successful post submission.
     * - Re-fetches and updates the post list to reflect the newly added post.
     */
    const handlePostSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission

        try {
            await createPost({ forumId, content }); // Send new post data to API
            setContent(''); // Clear the input field

            // Fetch the updated list of posts to reflect the new post in the UI
            const updatedPosts = await fetchPostsByForum(forumId);
            setPosts(updatedPosts); // Update the state with new posts
        } catch (error) {
            console.error('Error creating post:', error); // Log error if post creation fails
        }
    };

    return (
        <div className="forum-posts-container">
            {/* Header Title for the Forum Posts Section */}
            <h1 className="forum-posts-title">Posts</h1>

            {/* List of posts displayed as an unordered list */}
            <ul className="forum-posts-list">
                {posts.map((post) => (
                    <li key={post.id} className="forum-post-item">
                        {/* Display post content */}
                        <p className="forum-post-content">{post.content}</p>

                        {/* Display the author of the post */}
                        <small className="forum-post-author">Created by: {post.createdBy}</small>
                    </li>
                ))}
            </ul>

            {/* Form for submitting a new post */}
            <form onSubmit={handlePostSubmit} className="forum-post-form">
                {/* Textarea for entering a new post */}
                <textarea
                    className="forum-post-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Update state on input change
                    placeholder="Write a post..."
                    required // Ensures the user cannot submit an empty post
                />

                {/* Submit button for the form */}
                <button type="submit" className="forum-post-button">Submit</button>
            </form>
        </div>
    );
};

export default ForumPosts;
