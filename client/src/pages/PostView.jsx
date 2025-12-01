import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postAPI } from '../services/api';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const PostView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await postAPI.getPost(id);
                setPost(response.data);
            } catch (err) {
                console.error('Failed to fetch post:', err);
                setError('Post not found or has been deleted.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
                <h2 className="text-2xl font-bold mb-2">Oops!</h2>
                <p className="text-text-muted mb-4">{error}</p>
                <button onClick={() => navigate('/')} className="btn btn-primary">
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="container max-w-2xl mx-auto py-8 px-4">
            <PostCard post={post} onDelete={handleDelete} />
        </div>
    );
};

export default PostView;
