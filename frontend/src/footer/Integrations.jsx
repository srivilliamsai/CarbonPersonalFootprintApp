import React, { useState } from 'react';
import Footer from '../Footer';

const Integrations = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Health', 'Smart Home', 'Auto', 'Productivity'];

    const integrations = [
        { name: 'Apple Health', cat: 'Health', icon: '🍎', desc: 'Sync steps and cycling data automatically.' },
        { name: 'Google Fit', cat: 'Health', icon: '👟', desc: 'Import physical activity to estimate calories.' },
        { name: 'Tesla', cat: 'Auto', icon: '🚗', desc: 'Real-time charging and mileage tracking.' },
        { name: 'Nest', cat: 'Smart Home', icon: '🏠', desc: 'Optimize improved heating and cooling usage.' },
        { name: 'Strava', cat: 'Health', icon: '🚴', desc: 'Detailed commute tracking for cyclists.' },
        { name: 'Slack', cat: 'Productivity', icon: '💬', desc: 'Share team sustainability goals and wins.' },
        { name: 'Zapier', cat: 'Productivity', icon: '⚡️', desc: 'Automate your carbon logging workflows.' },
        { name: 'MyFitnessPal', cat: 'Health', icon: '🥗', desc: 'Sync dietary logs for carbon impact analysis.' },
    ];

    const filtered = activeTab === 'All' ? integrations : integrations.filter(i => i.cat === activeTab);

    return (
        <div className="min-h-screen bg-white dark:bg-carbon-dark text-gray-900 dark:text-white selection:bg-carbon-green selection:text-black font-sans animate-in fade-in duration-700 transition-colors duration-300">
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-carbon-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div
                        onClick={() => onNavigate('landing')}
                        className="text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="w-8 h-8 bg-carbon-green rounded-full blur-[2px] opacity-80"></div>
                        <span className="relative z-10">Carbon</span>
                    </div>
                    <div className="hidden md:block font-bold text-xl tracking-tight text-gray-500">Integrations</div>
                    <div className="w-24"></div>
                </div>
            </nav>

            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6">Connect your world.</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto transition-colors duration-300">
                    Carbon plays nice with the apps and devices you already use.
                </p>

                {/* Search & Filter */}
                <div className="flex flex-col items-center gap-8 mb-16">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search integrations..."
                            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-6 py-4 pl-12 focus:outline-none focus:border-carbon-green transition-colors text-black dark:text-white"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                    {filtered.map((item, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-carbon-gray border border-gray-200 dark:border-white/5 p-6 rounded-2xl group hover:border-carbon-green/50 transition-all cursor-pointer hover:-translate-y-1 shadow-sm dark:shadow-none">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-xl flex items-center justify-center text-2xl">{item.icon}</div>
                                <span className="text-xs font-bold bg-black/5 dark:bg-white/5 px-2 py-1 rounded text-gray-500 uppercase">{item.cat}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-carbon-green transition-colors">{item.name}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-gray-500 py-20">No integrations found for this category.</div>
                )}

            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Integrations;
