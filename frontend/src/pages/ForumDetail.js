import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommentsByForum, addCommentToForum, fetchPostsByForum } from '../services/api';

const ForumDetail = () => {
    const { forumId } = useParams(); // Forum-ID aus der URL abrufen
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Forum-Daten (Beiträge und Kommentare) laden
    useEffect(() => {
        const loadForumData = async () => {
            try {
                setLoading(true);
                const [commentsData, postsData] = await Promise.all([
                    fetchCommentsByForum(forumId),
                    fetchPostsByForum(forumId),
                ]);
                setComments(commentsData);
                setPosts(postsData);
            } catch (err) {
                console.error('Fehler beim Laden der Forum-Daten:', err);
                setError('Fehler beim Laden der Forum-Daten.');
            } finally {
                setLoading(false);
            }
        };
        loadForumData();
    }, [forumId]);

    // Neuer Kommentar hinzufügen
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const comment = { content: newComment };
            const addedComment = await addCommentToForum(forumId, comment);
            setComments((prev) => [...prev, addedComment]); // Kommentar zur Liste hinzufügen
            setNewComment(''); // Eingabefeld zurücksetzen
        } catch (err) {
            console.error('Fehler beim Hinzufügen des Kommentars:', err);
            setError('Fehler beim Hinzufügen des Kommentars.');
        }
    };

    if (loading) return <p>Laden...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Forum Detail</h1>
            {/* Beiträge anzeigen */}
            <h2>Beiträge</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>

            {/* Kommentare anzeigen */}
            <h2>Kommentare</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.author || 'Unbekannt'}</strong>: {comment.content}
                    </li>
                ))}
            </ul>

            {/* Kommentar hinzufügen */}
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Schreibe einen Kommentar..."
            ></textarea>
            <button onClick={handleAddComment}>Kommentar hinzufügen</button>
        </div>
    );
};

export default ForumDetail;
