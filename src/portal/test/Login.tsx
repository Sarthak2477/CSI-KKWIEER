import React, { useState } from 'react';

interface LoginProps {
    onLogin: (credentials: { username: string; password: string; secretCode: string }) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secretCode, setSecretCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!username || !password || !secretCode) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, secretCode }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                onLogin({ username, password, secretCode });
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            // Fallback for development
            if (secretCode === 'CSI2025' && username === 'student' && password === 'test123') {
                onLogin({ username, password, secretCode });
            } else {
                setError('Invalid credentials. Use: student/test123/CSI2025');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Test Login</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Secret Code
                        </label>
                        <input
                            type="password"
                            value={secretCode}
                            onChange={(e) => setSecretCode(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter secret code"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login to Test'}
                    </button>
                </form>

                <div className="mt-6 text-xs text-gray-500 text-center">
                    <p>• Ensure you have the correct credentials</p>
                    <p>• Contact administrator if you need access</p>
                </div>
            </div>
        </div>
    );
};