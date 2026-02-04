import React from 'react';
import Footer from '../Footer';

const Terms = ({ onNavigate }) => {
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
                    <div className="hidden md:block font-bold text-xl tracking-tight text-gray-500">Terms of Service</div>
                    <div className="w-24"></div>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                <p className="text-gray-500 mb-10">Last updated: February 2, 2026</p>

                <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Acceptance of Terms</h2>
                        <p>By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Carbon's website for personal, non-commercial transitory viewing only.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">3. Disclaimer</h2>
                        <p>The materials on Carbon's website are provided on an 'as is' basis. Carbon makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
                    </section>
                </div>
            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Terms;
