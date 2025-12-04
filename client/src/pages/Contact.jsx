import { useState } from 'react';
import { Link } from 'react-router-dom';
import { contactAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            // Append files
            for (let i = 0; i < files.length; i++) {
                formData.append('media', files[i]);
            }

            await contactAPI.sendContactMessage(formData);
            setSuccess(true);
            setName('');
            setEmail('');
            setMessage('');
            setFiles([]);
        } catch (error) {
            console.error('Failed to send message:', error);
            // Optionally handle error state here
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold gradient-text">Contact Us</h1>
                    <p className="text-text-muted mt-2">We'd love to hear from you</p>
                </div>

                {/* Contact Form */}
                <div className="glass rounded-2xl p-8 shadow-xl">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-text-primary mb-2">Message Sent!</h3>
                            <p className="text-text-muted mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="btn btn-primary"
                            >
                                Send Another Message
                            </button>
                            <div className="mt-6">
                                <Link to="/" className="text-primary hover:text-primary-light font-medium">
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    className="input textarea"
                                    placeholder="How can we help you?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    disabled={loading}
                                    rows="4"
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Attachments (Optional)</label>
                                <input
                                    type="file"
                                    className="block w-full text-sm text-text-muted
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-primary/10 file:text-primary
                                        hover:file:bg-primary/20
                                    "
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    disabled={loading}
                                    accept="image/*,video/*"
                                />
                                <p className="text-xs text-text-muted mt-1">Max 5 files (Images or Videos)</p>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full btn-lg"
                                disabled={loading}
                            >
                                {loading ? <LoadingSpinner size="sm" /> : 'Send Message'}
                            </button>

                            <div className="text-center mt-4">
                                <Link to="/" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                                    Back to Home
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
