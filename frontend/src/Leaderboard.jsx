import React, { useState, useEffect } from 'react';

const Leaderboard = ({ onBack }) => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:8089/api/leaderboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) setLeaders(await res.json());
            } catch (err) { console.error(err); }
        };
        fetchLeaders();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-carbon-dark p-6 md:p-10 text-gray-900 dark:text-white font-sans transition-colors duration-300">
            <div className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 max-w-4xl mx-auto shadow-2xl transition-colors duration-300">
                <button onClick={onBack} className="mb-8 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">← Back</button>
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white transition-colors duration-300">Global Leaderboard</h1>

                <div className="space-y-4">
                    {leaders.length === 0 ? (
                        <p className="text-center text-gray-500">No leaders yet. Be the first!</p>
                    ) : (
                        leaders.map((entry, idx) => (
                            <div key={entry.id} className="flex items-center gap-3 md:gap-6 p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300">
                                <span className={`text-2xl font-bold w-12 text-center ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-400' : 'text-gray-600'}`}>
                                    #{idx + 1}
                                </span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg">{entry.teamName || 'Anonymous Team'}</h3>
                                    <p className="text-gray-500 text-sm">User ID: {entry.user?.name || 'Unknown'}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-bold text-carbon-green">{entry.score}</span>
                                    <span className="text-xs uppercase tracking-wider text-gray-500">Points</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
