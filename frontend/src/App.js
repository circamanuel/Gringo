import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Import der Navigationsleiste und der Seitenkomponenten
import NavBar from './components/NavBar';
import ForumList from './pages/ForumList';
import CreateForum from './pages/CreateForum';
import PostList from './pages/PostList';
import Login from './pages/Login';
import Register from './pages/Register';

/**
 * Hauptkomponente der Anwendung
 * Diese Komponente verwaltet die Routen und die Navigation zwischen den Seiten.
 */
const App = () => {
    // Überprüft, ob ein Benutzer authentifiziert ist, basierend auf dem gespeicherten Token
    const isAuthenticated = (() => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            // Überprüfen, ob der Token abgelaufen ist (falls JWT verwendet wird)
            const { exp } = JSON.parse(atob(token.split('.')[1]));
            return exp * 1000 > Date.now();
        } catch (error) {
            console.error('Ungültiger Token:', error);
            return false;
        }
    })();

    return (
        // Router-Komponente für die Verwaltung der Navigation
        <Router>
            {/* Navigationsleiste */}
            <NavBar />
            {/* Definieren der Routen */}
            <Routes>
                {/* Route für die Liste der Foren */}
                <Route path="/forums" element={<ForumList />} />

                {/* Routen für die Authentifizierung */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Route für das Erstellen eines neuen Forums */}
                <Route
                    path="/create-forum"
                    element={
                        isAuthenticated ? (
                            <CreateForum />
                        ) : (
                            // Wenn nicht authentifiziert, wird der Benutzer zur Login-Seite weitergeleitet
                            <Navigate to="/login" state={{ from: '/create-forum' }} />
                        )
                    }
                />

                {/* Route für die Liste der Beiträge in einem bestimmten Forum */}
                <Route path="/posts/:forumId" element={<PostList />} />

                {/* Route für die Beiträge eines bestimmten Benutzers */}
                <Route
                    path="/user-posts/:username"
                    element={
                        isAuthenticated ? (
                            <PostList />
                        ) : (
                            // Weiterleitung zur Login-Seite, wenn nicht authentifiziert
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Catch-All-Route für ungültige URLs, leitet auf die Forumsliste um */}
                <Route path="*" element={<Navigate to="/forums" />} />
            </Routes>
        </Router>
    );
};

export default App;
