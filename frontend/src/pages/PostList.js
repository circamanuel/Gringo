import React from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

const PostList = () => {
    const { forumId } = useParams(); // Forum-ID aus der URL abrufen

    return (
        <div>
            <h1>Beiträge im Forum</h1>
            {/* Hier könnte die Liste der Beiträge angezeigt werden */}
            <div>
                <p>Liste der Beiträge für Forum {forumId}...</p>
            </div>

            {/* Kommentarfunktion */}
            <CommentSection forumId={forumId} />
        </div>
    );
};

export default PostList;
