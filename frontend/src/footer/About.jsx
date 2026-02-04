import React from 'react';
import Footer from '../Footer';

const About = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-carbon-dark text-gray-900 dark:text-white selection:bg-carbon-green selection:text-black font-sans animate-in fade-in duration-700 transition-colors duration-300">
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-carbon-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div
                        onClick={() => onNavigate('landing')}
                        className="text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <img src={`${import.meta.env.BASE_URL}logo-dark.png`} alt="Logo" className="h-10 w-10 object-contain hidden dark:block" />
                        <img src={`${import.meta.env.BASE_URL}logo-light.png`} alt="Logo" className="h-10 w-10 object-contain block dark:hidden" />
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-bold">Carbon</span>
                            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Personal Footprint</span>
                        </div>
                    </div>
                    <div className="hidden md:block font-bold text-xl tracking-tight text-gray-500">About Us</div>
                    <div className="w-24"></div>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

                {/* Intro */}
                <div className="mb-20">
                    <h1 className="text-5xl font-bold mb-8">We are building the operating system for a <span className="text-carbon-green">sustainable earth.</span></h1>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        Carbon was founded in 2024 with a rebellious spirit and a lofty objective: to make sustainability accessible, actionable, and beautiful. We believe that bad design is one of the biggest barriers to climate action.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 border-y border-gray-200 dark:border-white/5 py-12 transition-colors duration-300">
                    {[
                        { label: "Founded", val: "2024" },
                        { label: "Team", val: "24" },
                        { label: "Countries", val: "12+" },
                        { label: "Trees Planted", val: "50k" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl font-bold mb-1">{stat.val}</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Values */}
                <h2 className="text-3xl font-bold mb-12">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className="bg-gray-50 dark:bg-carbon-gray p-8 rounded-3xl border border-gray-200 dark:border-white/5 transition-colors duration-300">
                        <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center text-2xl mb-6">🔍</div>
                        <h3 className="text-xl font-bold mb-4">Radical Transparency</h3>
                        <p className="text-gray-400">We don't hide behind greenwashing. Our data sources are open, and our methodology is peer-reviewed.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-carbon-gray p-8 rounded-3xl border border-gray-200 dark:border-white/5 transition-colors duration-300">
                        <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center text-2xl mb-6">🎨</div>
                        <h3 className="text-xl font-bold mb-4">Design First</h3>
                        <p className="text-gray-400">Sustainability shouldn't feel like a chore. We obsess over every pixel to make the experience delightful.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-carbon-gray p-8 rounded-3xl border border-gray-200 dark:border-white/5 transition-colors duration-300">
                        <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center text-2xl mb-6">🤝</div>
                        <h3 className="text-xl font-bold mb-4">Community Powered</h3>
                        <p className="text-gray-400">We believe in the power of the collective. Individual actions, when multiplied, change systems.</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-carbon-gray p-8 rounded-3xl border border-gray-200 dark:border-white/5 transition-colors duration-300">
                        <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-full flex items-center justify-center text-2xl mb-6">🚀</div>
                        <h3 className="text-xl font-bold mb-4">Optimism</h3>
                        <p className="text-gray-400">We reject climate doomerism. We believe in human ingenuity and our ability to solve hard problems.</p>
                    </div>
                </div>

            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default About;
