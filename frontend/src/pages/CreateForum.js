import React, { useState } from 'react';
import { createForum } from '../services/api'; // Import the API function for creating a forum

const CreateForum = () => {
    // State variables for form inputs and error handling
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior

        try {
            await createForum({ title, description }); // Calls the API to create a forum
            alert('Forum created!'); // Show a success message
            setTitle(''); // Reset title field
            setDescription(''); // Reset description field
        } catch (err) {
            setError('Error creating forum'); // Set error message if request fails
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Forum</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Update title state on change
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update description state on change
            />

            <button type="submit">Create</button> {/* Submit button */}
        </form>
    );
};

export default CreateForum;
