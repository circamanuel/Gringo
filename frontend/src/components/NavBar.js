import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForumList from '../pages/ForumList';
import ForumDetail from '../pages/ForumDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/forums" element={<ForumList />} />
                <Route path="/forums/:forumId" element={<ForumDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
