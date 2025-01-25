import React, { useState } from 'react';
import { createForum } from '../services/api';


const CreateForum = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createForum({ title, description });
            alert('Forum created!');
            setTitle('');
            setDescription('');
        } catch (err) {
            setError('Error creating forum');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Forum</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateForum;
