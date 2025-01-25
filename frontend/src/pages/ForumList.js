import React, { useEffect, useState } from 'react';
import { fetchForums } from '../services/api';

const ForumList = () => {
    const [forums, setForums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllForums = async () => {
            try {
                const data = await fetchForums();
                setForums(data);
            } catch (err) {
                setError('Error fetching forums');
            }
        };

        fetchAllForums();
    }, []);

    return (
        <div>
            <h1>Forum List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {forums.map((forum) => (
                    <li key={forum.id}>
                        <h3>{forum.title}</h3>
                        <p>{forum.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ForumList;
