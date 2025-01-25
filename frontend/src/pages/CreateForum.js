import React, { useState } from 'react';
import { createForum } from '../services/api';

const CreateForum = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createForum({ title, description });
            setTitle('');
            setDescription('');
            alert('Forum created successfully!');
        } catch (error) {
            console.error('Error creating forum:', error);
        }
    };

    return (
        <div>
            <h1>Create Forum</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Forum Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Forum Description"
                    required
                />
                <button type="submit">Create Forum</button>
            </form>
        </div>
    );
};

export default CreateForum;
