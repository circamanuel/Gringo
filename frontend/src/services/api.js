const BASE_URL = 'http://localhost:8080/api';

// Fetch all forums
export const fetchForums = async () => {
    const response = await fetch(`${BASE_URL}/forums`);
    if (!response.ok) {
        throw new Error('Failed to fetch forums');
    }
    return response.json();
};

// Create a new forum
export const createForum = async (forum) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/forums`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(forum),
    });
    if (!response.ok) {
        throw new Error('Failed to create forum');
    }
};

// Fetch posts by forum ID
export const fetchPostsByForum = async (forumId) => {
    const response = await fetch(`${BASE_URL}/posts?forumId=${forumId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

// Create a new post
export const createPost = async (post) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error('Failed to create post');
    }
};

// Login and retrieve a token
export const login = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
};

// Register a new user
export const register = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    if (!response.ok) {
        throw new Error('Registration failed');
    }
};
