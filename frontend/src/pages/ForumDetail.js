import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/App.css'; // Import the CSS file for styling

function ForumDetail() {
    const { forumId } = useParams(); // Get the forum ID from the URL parameters
    const [posts, setPosts] = useState([]); // State to store posts
    const [newPost, setNewPost] = useState(''); // State to store new post input

    // Fetch posts for the given forum when the component mounts or forumId changes
    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
            const response = await fetch(`http://localhost:8080/api/posts?forumId=${forumId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token for authentication
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(data); // Update state with fetched posts
            }
        };
        fetchPosts();
    }, [forumId]);

    // Handle new post submission
    const handlePostSubmit = async () => {
        const token = localStorage.getItem('token'); // Retrieve JWT token
        const response = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include token for authentication
            },
            body: JSON.stringify({
                forumId: parseInt(forumId, 10), // Convert forumId to an integer
                content: newPost,
                username: 'testuser', // This should ideally be dynamic (retrieved from authentication context)
            }),
        });

        if (response.ok) {
            alert('Post successfully created!');
            setNewPost(''); // Clear the input field
            const newPostResponse = await response.json();
            setPosts((prevPosts) => [...prevPosts, newPostResponse]); // Update posts list
        } else {
            alert('Error creating post'); // Display error message if request fails
        }
    };

    return (
        <div className="forum-detail">
            <h1>Forum Details</h1>
            <h2>Posts</h2>
            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <p className="post-content">{post.content}</p>
                        <p className="post-username">by {post.username}</p>
                    </div>
                ))}
            </div>
            <h2>Create a New Post</h2>
            <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write your post..."
                className="post-textarea"
            />
            <button onClick={handlePostSubmit} className="post-button">Create Post</button>
        </div>
    );
}

export default ForumDetail;
