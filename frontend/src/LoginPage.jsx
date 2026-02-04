import React, { useState } from 'react';

const LoginPage = ({ onLogin, onBack }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null); // Clear error on typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!formData.email || !formData.password || (isRegistering && !formData.name)) {
            setError("Please fill in all the content.");
            return;
        }

        try {
            if (isRegistering) {
                const response = await fetch('http://localhost:8089/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    alert("Registration Successful! Please login.");
                    setIsRegistering(false);
                } else if (response.status === 409) {
                    setError("User already registered");
                } else {
                    setError("Registration Failed");
                }
            } else {
                // Real Login Call
                const response = await fetch('http://localhost:8089/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const data = await response.json(); // Returns { accessToken, refreshToken, username }
                    if (data.accessToken) {
                        // Store token (in a real app, use localStorage or Context)
                        localStorage.setItem('token', data.accessToken);
                        localStorage.setItem('refresh', data.refreshToken);

                        onLogin({ name: data.username, email: formData.email, role: 'User' });
                    } else {
                        setError("Login Failed: No token received.");
                    }
                } else {
                    setError("Invalid Credentials");
                }
            }
        } catch (err) {
            console.error(err);
            setError("Login Error: Server may be down.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-carbon-dark relative overflow-hidden font-sans selection:bg-carbon-green selection:text-black transition-colors duration-300 px-4">

            {/* Back to Home Button */}
            <div className="absolute top-8 left-8 z-50">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group px-4 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    <span className="font-medium text-sm">Back to Home</span>
                </button>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-carbon-green/10 rounded-full blur-[150px] animate-pulse-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />

            <div className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-[2.5rem] p-10 md:p-14 w-full max-w-md relative z-10 animate-in zoom-in-95 duration-500 transition-colors duration-300">

                {/* Logo & Header */}
                <div className="text-center mb-10">

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 transition-colors duration-300">
                        {isRegistering ? 'Create your account' : 'Welcome back'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                        {isRegistering ? 'Start tracking your impact today.' : 'Please sign in to continue.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="flex items-center gap-3 bg-red-500/10 dark:bg-red-500/5 backdrop-blur-xl border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl animate-in slide-in-from-top-2 fade-in duration-300">
                            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}
                    {isRegistering && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Username"
                                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:ring-1 focus:ring-carbon-green/50 focus:border-carbon-green/50 transition-all outline-none"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:ring-1 focus:ring-carbon-green/50 focus:border-carbon-green/50 transition-all outline-none"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-white/10 focus:ring-1 focus:ring-carbon-green/50 focus:border-carbon-green/50 transition-all outline-none"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all active:scale-[0.98] shadow-lg mt-2">
                        {isRegistering ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center pt-8 border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
                    <p className="text-gray-500 text-sm mb-3">{isRegistering ? 'Already have an account?' : 'Don\'t have an account?'}</p>
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="text-carbon-green text-sm font-bold hover:underline transition-all"
                    >
                        {isRegistering ? 'Sign in' : 'Create free account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
