// Base URL for all API calls
const BASE_URL = 'http://localhost:8080/api';

/**
 * Utility function: Retrieves the token from LocalStorage and verifies its validity.
 * If the token is expired, it removes the token and redirects to login.
 * @returns {string|null} The valid token or null if the token is missing or expired.
 */
const getToken = () => {
    const token = localStorage.getItem('token'); // Retrieve token from LocalStorage
    if (!token) return null;

    try {
        const { exp } = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload

        // Check if the token is expired
        if (exp * 1000 < Date.now()) {
            console.warn('Token expired. Logging out user.');
            localStorage.removeItem('token'); // Remove expired token
            window.location.href = '/login'; // Redirect to login page
            return null;
        }
        return token; // Return valid token
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Remove invalid token
        return null;
    }
};

/**
 * Utility function: Creates HTTP headers for API requests.
 * @param {boolean} isAuthRequired Determines if the Authorization header is needed.
 * @returns {object} HTTP headers.
 */
const getHeaders = (isAuthRequired = false) => {
    const headers = { 'Content-Type': 'application/json' }; // Default headers
    if (isAuthRequired) {
        const token = getToken();
        if (token) headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return headers;
};

/**
 * Utility function: Handles generic API requests.
 * @param {string} endpoint The API endpoint.
 * @param {string} method The HTTP method (GET, POST, PUT, DELETE).
 * @param {object|null} body Request payload (if required).
 * @param {boolean} isAuthRequired Determines if authentication is needed.
 * @returns {Promise<any>} API response.
 */
const apiRequest = async (endpoint, method = 'GET', body = null, isAuthRequired = false) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: getHeaders(isAuthRequired),
            body: body ? JSON.stringify(body) : null, // Send body as JSON (if applicable)
        });

        // Handle errors based on response status
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error processing API request');
        }

        return response.status !== 204 ? response.json() : null; // Handle responses with no content (204)
    } catch (error) {
        console.error(`API Error [${method} ${endpoint}]:`, error);
        throw error;
    }
};

/**
 * API Calls
 */

// Fetch all forums
export const fetchForums = async () => apiRequest('/forums');

/**
 * Creates a new forum.
 * @param {object} forum Forum data.
 * @returns {Promise<any>} API response.
 */
export const createForum = async (forum) => apiRequest('/forums', 'POST', forum, true);

/**
 * Updates an existing forum.
 * @param {string} forumId Forum ID.
 * @param {object} forum Updated forum data.
 * @returns {Promise<any>} Updated forum response.
 */
export const updateForum = async (forumId, forum) => apiRequest(`/forums/${forumId}`, 'PUT', forum, true);

/**
 * Deletes a forum.
 * @param {string} forumId Forum ID.
 * @returns {Promise<void>} No response on success.
 */
export const deleteForum = async (forumId) => apiRequest(`/forums/${forumId}`, 'DELETE', null, true);

/**
 * Fetches all posts in a specific forum.
 * @param {string} forumId Forum ID.
 * @returns {Promise<any>} List of posts.
 */
export const fetchPostsByForum = async (forumId) => apiRequest(`/posts?forumId=${forumId}`);

/**
 * Creates a new post in a forum.
 * @param {object} postData { forumId, content }
 * @returns {Promise<any>} Created post.
 */
export const createPost = async (postData) => apiRequest('/posts', 'POST', postData, true);

/**
 * Deletes a specific post.
 * @param {string} postId Post ID.
 * @returns {Promise<void>} No response on success.
 */
export const deletePost = async (postId) => apiRequest(`/posts/${postId}`, 'DELETE', null, true);

/**
 * Fetches posts created by a specific user.
 * @param {string} username Username.
 * @returns {Promise<any>} List of user posts.
 */
export const fetchPostsByUser = async (username) => apiRequest(`/posts/user/${username}`);

/**
 * Fetches details of a specific user.
 * @param {string} userId User ID.
 * @returns {Promise<any>} User details.
 */
export const fetchUserById = async (userId) => apiRequest(`/users/${userId}`, 'GET', null, true);

/**
 * Adds a comment to a post.
 * @param {string} postId Post ID.
 * @param {object} commentData { content }
 * @returns {Promise<any>} Created comment.
 */
export const addCommentToPost = async (postId, commentData) => apiRequest(`/posts/${postId}/comments`, 'POST', commentData, true);

/**
 * Fetches all comments on a specific post.
 * @param {string} postId Post ID.
 * @returns {Promise<any>} List of comments.
 */
export const fetchCommentsByPost = async (postId) => apiRequest(`/posts/${postId}/comments`, 'GET');

/**
 * Logs in a user and returns a token.
 * @param {object} credentials { username, password }
 * @returns {Promise<string>} Token on success.
 */
export const login = async (credentials) => {
    const response = await apiRequest('/auth/login', 'POST', credentials);
    return response.token; // Return token
};

/**
 * Registers a new user.
 * @param {object} credentials { username, password }
 * @returns {Promise<void>} No response on success.
 */
export const register = async (credentials) => apiRequest('/auth/register', 'POST', credentials);

/**
 * Logs out the user by removing the token and redirecting to login.
 */
export const logout = () => {
    localStorage.removeItem('token'); // Remove token
    window.location.href = '/login'; // Redirect to login
};
