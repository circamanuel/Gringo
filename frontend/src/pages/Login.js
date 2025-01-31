import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset previous errors

        try {
            const token = await login(credentials);
            localStorage.setItem('token', token);
            navigate('/forums'); // Redirect to forums after successful login
        } catch (error) {
            setError('Invalid username or password'); // Set error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
