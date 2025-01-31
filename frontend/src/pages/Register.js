import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message

        try {
            await register(credentials);
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            setError('Registration failed. Username may already be taken.'); // Set error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}
            <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
