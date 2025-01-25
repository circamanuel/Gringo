import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import für PropTypes
import { fetchCommentsByForum, addCommentToForum } from '../services/api';

const CommentSection = ({ forumId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Kommentare laden
    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchCommentsByForum(forumId);
                setComments(data);
            } catch (err) {
                console.error('Fehler beim Laden der Kommentare:', err);
                setError('Fehler beim Laden der Kommentare');
            }
        };

        loadComments();
    }, [forumId]);

    // Kommentar hinzufügen
    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            setLoading(true);
            const comment = { content: newComment };
            const addedComment = await addCommentToForum(forumId, comment);
            setComments((prevComments) => [...prevComments, addedComment]);
            setNewComment('');
        } catch (err) {
            console.error('Fehler beim Hinzufügen des Kommentars:', err);
            setError('Fehler beim Hinzufügen des Kommentars');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Kommentare</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.author || 'Anonym'}</strong>: {comment.content}
                    </li>
                ))}
            </ul>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Schreibe einen Kommentar..."
            ></textarea>
            <button onClick={handleAddComment} disabled={loading}>
                Kommentar hinzufügen
            </button>
        </div>
    );
};

// PropTypes für die Typprüfung
CommentSection.propTypes = {
    forumId: PropTypes.string.isRequired, // `forumId` ist eine erforderliche Zeichenkette
};

export default CommentSection;
