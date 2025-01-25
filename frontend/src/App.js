import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForumList from './pages/ForumList';
import ForumDetail from './pages/ForumDetail';
import CreateForum from './pages/CreateForum';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/forums" element={<ForumList />} />
                <Route path="/forums/new" element={<CreateForum />} />
                <Route path="/forums/:forumId" element={<ForumDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
