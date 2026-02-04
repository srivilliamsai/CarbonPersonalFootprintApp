import React from 'react';
import Footer from '../Footer';

const Press = ({ onNavigate }) => {
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
                    <div className="hidden md:block font-bold text-xl tracking-tight text-gray-500">Press Center</div>
                    <div className="w-24"></div>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-6">Press Center</h1>
                <p className="text-xl text-gray-400 mb-12">
                    News, updates, and resources for media professionals.
                </p>

                <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-white/10 pb-4">Latest News</h2>
                <div className="space-y-8 mb-16">
                    <div className="block group">
                        <span className="text-sm text-carbon-green mb-2 block">February 1, 2026</span>
                        <h3 className="text-3xl font-bold mb-2 group-hover:underline">Carbon App reaches 10,000 Users</h3>
                        <p className="text-gray-400">We are thrilled to announce a major milestone in our journey.</p>
                    </div>
                    <div className="block group">
                        <span className="text-sm text-gray-500 mb-2 block">December 15, 2025</span>
                        <h3 className="text-3xl font-bold mb-2 group-hover:underline">Carbon raises Series A to Expand to Europe</h3>
                        <p className="text-gray-400">Leading investors join our mission.</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Media Kit</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-carbon-gray p-8 rounded-2xl border border-gray-200 dark:border-white/5 text-center transition-colors duration-300">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="font-bold mb-2">Logos & Assets</h3>
                        <button className="text-carbon-green hover:underline">Download ZIP</button>
                    </div>
                    <div className="bg-carbon-gray p-8 rounded-2xl border border-white/5 text-center">
                        <div className="text-4xl mb-4">📸</div>
                        <h3 className="font-bold mb-2">Product Screenshots</h3>
                        <button className="text-carbon-green hover:underline">Download ZIP</button>
                    </div>
                </div>
            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Press;
