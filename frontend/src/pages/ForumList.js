import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'; // Import the CSS file for styling

function ForumList() {
    const [forums, setForums] = useState([]); // State to store the list of forums

    // Fetch forums when the component mounts
    useEffect(() => {
        const fetchForums = async () => {
            const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
            const response = await fetch('http://localhost:8080/api/forums', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token for authentication
                },
            });

            if (response.ok) {
                const data = await response.json();
                setForums(data); // Update state with fetched forums
            }
        };
        fetchForums();
    }, []);

    return (
        <div className="forum-list">
            <h1>Forums</h1>
            {forums.map((forum) => (
                <div key={forum.id} className="forum-item">
                    <h2>{forum.title}</h2>
                    <p>{forum.description}</p>
                    <Link to={`/forums/${forum.id}`}>View Details</Link> {/* Link to forum details page */}
                </div>
            ))}
        </div>
    );
}

export default ForumList;
