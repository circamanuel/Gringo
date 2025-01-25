import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ForumList from './pages/ForumList';
import CreateForum from './pages/CreateForum';
import PostList from './pages/PostList';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/forums" element={<ForumList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/create-forum"
                    element={isAuthenticated ? <CreateForum /> : <Navigate to="/login" />}
                />
                <Route
                    path="/posts/:forumId"
                    element={isAuthenticated ? <PostList /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/forums" />} />
            </Routes>
        </Router>
    );
};

export default App;
