import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ForumList() {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const fetchForums = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/forums', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setForums(data);
            }
        };
        fetchForums();
    }, []);

    return (
        <div>
            <h1>Forums</h1>
            {forums.map((forum) => (
                <div key={forum.id}>
                    <h2>{forum.title}</h2>
                    <p>{forum.description}</p>
                    <Link to={`/forums/${forum.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
}

export default ForumList;
