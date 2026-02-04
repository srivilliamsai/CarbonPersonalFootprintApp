import React, { useEffect, useState } from 'react';
import Footer from './Footer';

const LandingPage = ({ onGetStarted, onNavigate, initialScrollSection }) => {
    const [selectedTip, setSelectedTip] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);

    // Close modal on escape key (Enhanced for both modals)
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setSelectedTip(null);
                setSelectedFeature(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedTip || selectedFeature) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedTip, selectedFeature]);

    const features = [
        {
            id: 'analytics',
            title: 'Real-time Analytics',
            icon: '📊',
            desc: 'Visualize your emissions data with beautiful, interactive charts. Understand precisely where your footprint comes from.',
            details: (
                <div className="space-y-8">
                    <div className="bg-[#111] p-6 rounded-3xl border border-white/5">
                        <div className="flex items-end justify-between h-40 gap-2 mb-4">
                            {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                <div key={i} className="w-full bg-white/5 rounded-t-lg relative group overflow-hidden">
                                    <div className="absolute bottom-0 w-full bg-carbon-green/80 transition-all duration-1000" style={{ height: `${h}%` }}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 font-mono">
                            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Our powerful dashboard aggregates your daily logs into clear, actionable visualisations.
                        Track trends over time, identify spikes in your carbon footprint, and filter by category (Transport, Diet, Energy) to see exactly where you can improve.
                    </p>
                </div>
            )
        },
        {
            id: 'goals',
            title: 'Eco Goals',
            icon: '🌱',
            desc: 'Set personalized targets (e.g., "Meatless Mondays") and track your daily progress.',
            details: (
                <div className="space-y-8">
                    <div className="bg-[#111] p-8 rounded-3xl border border-white/5 flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-6">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="none" className="text-white/5" />
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="none" className="text-carbon-green" strokeDasharray="553" strokeDashoffset="110" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-white">80%</span>
                                <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Goal Met</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-bold text-white mb-1">Meatless Month</h4>
                            <p className="text-carbon-green font-medium">24 / 30 Days Completed</p>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Setting specific, measurable goals is the most effective way to change habits.
                        Choose from our library of challenges or create your own custom targets. We'll track your streaks and celebrate your milestones.
                    </p>
                </div>
            )
        },
        {
            id: 'insights',
            title: 'Smart Insights',
            icon: '⚡️',
            desc: 'Receive AI-driven recommendations tailored to your habits. Simple changes, massive impact.',
            details: (
                <div className="space-y-8">
                    <div className="relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-8 rounded-3xl border border-indigo-500/20 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px]"></div>
                        <div className="relative z-10 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-2xl shrink-0">💡</div>
                            <div>
                                <h4 className="text-indigo-300 font-bold text-sm uppercase tracking-wider mb-2">Recommendation</h4>
                                <p className="text-white font-medium text-lg italic">"You've driven 50 miles this week. Switching to public transit for just 2 days could save 12kg of CO₂."</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Our intelligent system analyzes your logging history to find specific opportunities for reduction.
                        No generic advice—just personalized, high-impact suggestions tailored to your unique lifestyle.
                    </p>
                </div>
            )
        }
    ];

    const tips = [
        {
            title: 'Shop Local & Seasonal',
            desc: 'Reduce transport emissions by buying items produced near you.',
            icon: '🛒',
            details: (
                <div className="space-y-8">
                    <div className="bg-black/20 p-8 rounded-3xl border border-white/5 flex flex-col items-center">
                        <h4 className="text-xl font-bold mb-6 text-gray-300">Food Miles Comparison</h4>
                        <div className="w-full flex justify-between items-end h-40 gap-4 px-4">
                            <div className="w-1/2 flex flex-col items-center gap-2 group">
                                <span className="text-xs text-red-400 font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">1500 Miles</span>
                                <div className="w-16 bg-red-500/20 rounded-t-lg relative overflow-hidden h-32 w-full max-w-[100px]">
                                    <div className="absolute inset-0 bg-red-500/50 animate-pulse"></div>
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl">✈️</div>
                                </div>
                                <span className="text-sm font-bold text-gray-500">Imported</span>
                            </div>
                            <div className="w-1/2 flex flex-col items-center gap-2 group">
                                <span className="text-xs text-carbon-green font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">50 Miles</span>
                                <div className="w-16 bg-carbon-green/20 rounded-t-lg relative overflow-hidden h-8 w-full max-w-[100px]">
                                    <div className="absolute inset-0 bg-carbon-green/50"></div>
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xl">🚚</div>
                                </div>
                                <span className="text-sm font-bold text-carbon-green">Local</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Imported food travels an average of <span className="text-white font-bold">1,500 miles</span> before it reaches your plate.
                        Buying from local farmers markets drastically cuts these transport emissions and supports your community economy.
                    </p>
                </div>
            )
        },
        {
            title: 'Phantom Energy',
            desc: 'Unplug devices when not in use to stop "vampire" power drain.',
            icon: '🔌',
            details: (
                <div className="space-y-8">
                    <div className="relative h-48 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-red-900/10 animate-pulse-slow"></div>
                        <div className="relative z-10 text-center">
                            <div className="text-6xl mb-4 relative inline-block">
                                🔌
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full blur-[2px] animate-ping"></div>
                            </div>
                            <div className="text-2xl font-bold text-red-500">Standby Mode</div>
                            <div className="text-sm text-gray-400">Consumes 10-20% of household energy</div>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Many devices like TVs, consoles, and chargers continue to draw power even when turned off.
                        This "vampire load" can account for up to <span className="text-white font-bold">20%</span> of your monthly electricity bill.
                        <br /><br />
                        <span className="text-carbon-green font-bold">Pro Tip:</span> Use smart power strips to cut power to all devices at once.
                    </p>
                </div>
            )
        },
        {
            title: 'Plant-Based Choices',
            desc: 'Eating meat-free one day a week saves ~3kg of CO₂ per person.',
            icon: '🥗',
            details: (
                <div className="space-y-8">
                    <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
                        <h4 className="text-lg font-bold mb-4 text-center text-gray-400">CO₂ (kg) per Serving</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-gray-400"><span>Beef Burger</span><span>6.0 kg</span></div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-[90%]"></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-gray-400"><span>Chicken</span><span>1.5 kg</span></div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-orange-400 w-[25%]"></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1 text-white"><span>Plant-Based</span><span>0.3 kg</span></div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-carbon-green w-[5%] shadow-[0_0_10px_#2db54d]"></div></div>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        You don't have to go full vegan to make an impact. Simply swapping <span className="text-carbon-green font-bold">one meal a day</span>
                        for a plant-based option reduces your dietary carbon footprint by nearly 40%.
                    </p>
                </div>
            )
        },
        {
            title: 'Circular Economy',
            desc: 'Repair, resell, and recycle instead of throwing away.',
            icon: '🔄',
            details: (
                <div className="space-y-8">
                    <div className="flex justify-center py-8">
                        <div className="relative w-40 h-40 border-4 border-dashed border-white/10 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2">♻️</div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#0a0a0a] px-2">🛠️</div>
                            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2">📉</div>
                            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2">🎁</div>
                        </div>
                        <div className="absolute self-center font-bold text-carbon-green">LOOP</div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        In a linear economy, we take, make, and waste. A circular economy keeps resources in use for as long as possible.
                        <br /><br />
                        Repairing a laptop instead of replacing it saves the equivalent of <span className="text-white font-bold">270kg of CO₂</span> emissions generated during manufacturing.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-carbon-dark text-gray-900 dark:text-white overflow-hidden relative selection:bg-carbon-green selection:text-black font-sans transition-colors duration-300">

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-carbon-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="text-xl font-bold tracking-tight flex items-center gap-3">
                        <img src={`${import.meta.env.BASE_URL}logo-dark.png`} alt="Carbon Footprint Logo" className="h-10 w-10 object-contain hidden dark:block scale-110" />
                        <img src={`${import.meta.env.BASE_URL}logo-light.png`} alt="Carbon Footprint Logo" className="h-10 w-10 object-contain block dark:hidden scale-110" />
                        <span className="relative z-10">Carbon Footprint</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="#features" className="hidden md:block text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Features</a>
                        <a href="#impact" className="hidden md:block text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Impact</a>
                        <button
                            onClick={onGetStarted}
                            className="text-sm font-medium bg-white/10 px-5 py-2 rounded-full hover:bg-white/20 transition-all"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 flex flex-col items-center justify-center text-center">
                {/* Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-carbon-green/10 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-gray-900 dark:text-white mb-8 max-w-5xl leading-[0.9] transition-colors duration-300">
                    Track Your <br />
                    <span className="text-carbon-green">Impact.</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                    Monitor your personal carbon footprint with precision and elegance.
                    Make mindful choices for a greener future.
                </p>

                <button
                    onClick={onGetStarted}
                    className="group relative px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-carbon-green/20"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Start Tracking Free
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                </button>
            </div>

            {/* Stats Ticker */}
            <div id="impact" className="border-y border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-carbon-light/30 backdrop-blur-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">10k+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Active Users</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">500T</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">CO₂ Saved</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">1M+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Logs Created</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-1">4.9/5</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">App Rating</div>
                    </div>
                </div>
            </div>

            {/* Educational Section: The Carbon Cycle */}
            <div className="py-32 relative overflow-hidden">
                {/* Background Noise/Texture */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">The <span className="text-carbon-green">Carbon Cycle</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[20%] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent border-t border-dashed border-white/20 z-0"></div>

                        <div onClick={() => onNavigate('production')} className="bg-white dark:bg-carbon-gray backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/5 relative z-10 hover:border-carbon-green/50 transition-colors group cursor-pointer shadow-xl dark:shadow-none">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">🏭</div>
                            <h3 className="text-2xl font-bold mb-4">Production</h3>
                            <p className="text-gray-400 leading-relaxed">Carbon enters the atmosphere through industrial activities, burning fossil fuels, and deforestation. This excess CO₂ traps heat globally.</p>
                            <div className="mt-6 text-carbon-green font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Read More →</div>
                        </div>

                        <div onClick={() => onNavigate('impact')} className="bg-white dark:bg-carbon-gray backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/5 relative z-10 hover:border-carbon-green/50 transition-colors group cursor-pointer shadow-xl dark:shadow-none">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">🌡️</div>
                            <h3 className="text-2xl font-bold mb-4">Impact</h3>
                            <p className="text-gray-400 leading-relaxed">The greenhouse effect intensifies, leading to rising sea levels, extreme weather events, and disruption of natural ecosystems.</p>
                            <div className="mt-6 text-carbon-green font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Read More →</div>
                        </div>

                        <div onClick={() => onNavigate('solution')} className="bg-white dark:bg-carbon-gray backdrop-blur-md p-8 rounded-[2.5rem] border border-gray-200 dark:border-white/5 relative z-10 hover:border-carbon-green/50 transition-colors group cursor-pointer shadow-xl dark:shadow-none">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">♻️</div>
                            <h3 className="text-2xl font-bold mb-4">Solution</h3>
                            <p className="text-gray-400 leading-relaxed">By reducing emissions and supporting natural sinks like forests (sequestration), we can restore the planet's delicate balance.</p>
                            <div className="mt-6 text-carbon-green font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Read More →</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Global Context Section: The 2-Ton Goal */}
            <div className="py-24 bg-white dark:bg-[#050505] text-gray-900 dark:text-white relative overflow-hidden border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <div className="inline-block bg-carbon-green/10 text-carbon-green font-bold px-4 py-1.5 rounded-full text-sm mb-6 border border-carbon-green/20">The Paris Agreement Goal</div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">The <span className="text-black dark:text-white">2-Ton</span> <br /><span className="text-carbon-green">Challenge.</span></h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                            To prevent irreversible climate damage, scientists estimate we need to reach a global average of <strong>2 tons</strong> of CO₂ per person per year by 2050.
                            <br /><br />
                            Currently, the gap is massive. Most daily activities—from driving to diet—push us far beyond this sustainable limit.
                        </p>

                        <div className="flex gap-8 border-t border-gray-200 dark:border-white/10 pt-8">
                            <div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4.7t</div>
                                <div className="text-sm text-gray-500">Global Average</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-red-500 mb-1">14.0t</div>
                                <div className="text-sm text-gray-500">North America</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-carbon-green mb-1">2.0t</div>
                                <div className="text-sm text-gray-500">Sustainable Goal</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 p-10 rounded-[2.5rem] relative shadow-xl dark:shadow-none">
                        <h3 className="text-xl font-bold mb-8 flex justify-between">
                            <span>Annual CO₂ Footprint</span>
                            <span className="text-gray-500 text-sm font-normal">Tons per person</span>
                        </h3>

                        <div className="space-y-6">
                            {/* North America */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 dark:text-gray-300 font-medium">North America</span>
                                    <span className="text-red-500 dark:text-red-400 font-bold">14.2 tons</span>
                                </div>
                                <div className="h-4 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden relative">
                                    <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/20 animate-pulse"></div>
                                    <div className="h-full bg-gradient-to-r from-red-600 to-red-500 w-[95%] rounded-full relative z-10"></div>
                                </div>
                            </div>

                            {/* Europe */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 dark:text-gray-300 font-medium">Europe</span>
                                    <span className="text-orange-500 dark:text-orange-400 font-bold">6.8 tons</span>
                                </div>
                                <div className="h-4 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-orange-600 to-orange-500 w-[45%] rounded-full"></div>
                                </div>
                            </div>

                            {/* Global Avg */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600 dark:text-gray-300 font-medium">Global Average</span>
                                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">4.7 tons</span>
                                </div>
                                <div className="h-4 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-500 w-[35%] rounded-full"></div>
                                </div>
                            </div>

                            {/* The Goal */}
                            <div className="pt-4 relative">
                                {/* Dotted line marker */}
                                <div className="absolute top-0 bottom-0 left-[14%] w-px border-l border-dashed border-carbon-green/50 z-20"></div>
                                <div className="absolute -top-6 left-[14%] -translate-x-1/2 text-carbon-green text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#111] px-2 py-1 rounded border border-carbon-green/20">Goal</div>

                                <div className="flex justify-between text-sm mb-2 relative z-10">
                                    <span className="text-gray-900 dark:text-white font-bold flex items-center gap-2">
                                        Sustainable Target
                                        <span className="bg-carbon-green text-black text-[10px] px-1.5 py-0.5 rounded font-bold">2050</span>
                                    </span>
                                    <span className="text-carbon-green font-bold">2.0 tons</span>
                                </div>
                                <div className="h-4 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden relative z-10 box-content border border-carbon-green/30">
                                    <div className="h-full bg-carbon-green w-[14%] rounded-full shadow-[0_0_15px_rgba(45,181,77,0.5)]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            <span className="text-carbon-green font-bold">Carbon</span> helps you visualize your daily impact so you can make choices that bring us closer to this goal.
                        </div>
                    </div>
                </div>
            </div>
            {/* Actionable Tips: Reducing Waste */}
            <div className="py-20 px-6 max-w-7xl mx-auto">
                <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl dark:shadow-none transition-colors duration-300">
                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-carbon-green/5 rounded-full blur-[120px] pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">Simple ways to <br /> <span className="text-carbon-green">reduce waste.</span></h2>
                            <p className="text-xl text-gray-400 mb-10 max-w-lg">Small changes in your daily routine can add up to a massive impact over a year.</p>

                            <div className="space-y-6">
                                {tips.map((tip, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedTip(tip)}
                                        className="flex gap-6 items-start p-6 hover:bg-white/5 rounded-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-white/5 hover:scale-[1.02] group"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl shrink-0 border border-white/5 group-hover:bg-carbon-green/20 group-hover:scale-110 transition-all duration-500">{tip.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-carbon-green transition-colors flex items-center gap-2">
                                                {tip.title}
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white/10 px-2 py-0.5 rounded-full">Explore</span>
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full relative">
                            {/* Card visuals */}
                            <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="text-carbon-green font-bold text-sm uppercase tracking-wider mb-2">Did You Know?</div>
                                <div className="text-3xl font-bold mb-4">Food waste accounts for 8% of all greenhouse gas emissions.</div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[8%] bg-carbon-green"></div>
                                </div>
                            </div>

                            <div className="relative z-0 bg-carbon-gray border border-white/5 p-8 rounded-3xl shadow-2xl scale-95 -mt-20 opacity-60">
                                <div className="h-6 w-32 bg-white/10 rounded mb-4"></div>
                                <div className="h-4 w-full bg-white/5 rounded mb-2"></div>
                                <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Bento Grid */}
            <div id="features" className="max-w-7xl mx-auto mt-32 px-6 pb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Designed for <span className="text-carbon-green">Conscious Living</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={feature.id}
                            onClick={() => setSelectedFeature(feature)}
                            className={`col-span-1 ${feature.id === 'analytics' ? 'md:col-span-2' : ''} bg-white dark:bg-carbon-gray border border-gray-200 dark:border-white/5 p-10 rounded-[2.5rem] hover:border-carbon-green/30 transition-all duration-300 group relative overflow-hidden shadow-xl dark:shadow-none cursor-pointer hover:-translate-y-1`}
                        >
                            {feature.id === 'analytics' && <div className="absolute top-0 right-0 w-64 h-64 bg-carbon-green/5 rounded-full blur-[80px] group-hover:bg-carbon-green/10 transition-colors duration-700"></div>}
                            <div className="w-14 h-14 bg-carbon-light rounded-2xl flex items-center justify-center mb-8 text-3xl group-hover:scale-110 transition-transform border border-white/5">{feature.icon}</div>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-carbon-green transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{feature.desc}</p>
                            <div className="mt-6 flex items-center gap-2 text-carbon-green font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                Explore Details <span className="text-lg">→</span>
                            </div>
                        </div>
                    ))}

                    <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-carbon-green to-[#2db54d] p-10 rounded-[2.5rem] text-black relative overflow-hidden group">
                        <div className="relative z-10 pr-20">
                            <h3 className="text-3xl font-bold mb-4">Join the Community</h3>
                            <p className="text-black/80 text-lg leading-relaxed max-w-xl">Connect with thousands of others committed to saving the planet. Compare stats and compete on the leaderboard.</p>
                            <button onClick={onGetStarted} className="mt-8 px-6 py-3 bg-black/10 backdrop-blur-md rounded-xl font-semibold hover:bg-black/20 transition-colors">Join Now →</button>
                        </div>
                        <div className="absolute right-[-10%] bottom-[-40%] w-80 h-80 bg-white/30 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-32 text-center px-6">
                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Ready to make a change?</h2>
                <button
                    onClick={onGetStarted}
                    className="px-12 py-6 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-xl"
                >
                    Get Started Now
                </button>
            </div>

            {/* Enhanced Footer */}
            <Footer onNavigate={onNavigate} />

            {/* Tip Detail Modal */}
            {selectedTip && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => setSelectedTip(null)}
                    ></div>
                    <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-md p-6 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                                    {selectedTip.icon}
                                </div>
                                <div>
                                    <div className="text-xs text-carbon-green font-bold uppercase tracking-wider mb-0.5">Quick Tip</div>
                                    <h3 className="text-xl font-bold">{selectedTip.title}</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedTip(null)}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {selectedTip.details}
                        </div>
                    </div>
                </div>
            )}

            {/* Feature Detail Modal */}
            {selectedFeature && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => setSelectedFeature(null)}
                    ></div>
                    <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-md p-6 border-b border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                                    {selectedFeature.icon}
                                </div>
                                <div>
                                    <div className="text-xs text-carbon-green font-bold uppercase tracking-wider mb-0.5">Feature Spotlight</div>
                                    <h3 className="text-xl font-bold">{selectedFeature.title}</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedFeature(null)}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {selectedFeature.details}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default LandingPage;
