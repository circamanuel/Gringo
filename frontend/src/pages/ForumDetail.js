import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ForumDetail() {
    const { forumId } = useParams();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/posts?forumId=${forumId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            }
        };
        fetchPosts();
    }, [forumId]);

    const handlePostSubmit = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                forumId: parseInt(forumId, 10),
                content: newPost,
                username: 'testuser', // Dies sollte idealerweise dynamisch sein
            }),
        });

        if (response.ok) {
            alert('Post erfolgreich erstellt!');
            setNewPost('');
            const newPostResponse = await response.json();
            setPosts((prevPosts) => [...prevPosts, newPostResponse]);
        } else {
            alert('Fehler beim Erstellen des Posts');
        }
    };

    return (
        <div>
            <h1>Forum Details</h1>
            <h2>Posts</h2>
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.content}</p>
                    <p>by {post.username}</p>
                </div>
            ))}
            <h2>Neuen Post erstellen</h2>
            <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Schreibe deinen Post..." />
            <button onClick={handlePostSubmit}>Post erstellen</button>
        </div>
    );
}

export default ForumDetail;
