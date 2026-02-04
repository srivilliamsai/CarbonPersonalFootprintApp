import React from 'react';
import Footer from '../Footer';

const FeaturesPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-carbon-dark text-gray-900 dark:text-white selection:bg-carbon-green selection:text-black font-sans animate-in fade-in duration-700 transition-colors duration-300">

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-carbon-dark/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div
                        onClick={() => onNavigate('landing')}
                        className="text-xl font-bold tracking-tight flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <img src={`${import.meta.env.BASE_URL}logo-dark.png`} alt="Logo" className="h-8 w-8 object-contain hidden dark:block" />
                        <img src={`${import.meta.env.BASE_URL}logo-light.png`} alt="Logo" className="h-8 w-8 object-contain block dark:hidden" />
                        <span className="relative z-10">Carbon Personal Footprint</span>
                    </div>
                    <div className="hidden md:block font-bold text-xl tracking-tight text-gray-500">Features</div>
                    <div className="w-24"></div> {/* Spacer for centering */}
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

                {/* Hero */}
                <div className="text-center mb-32">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 dark:text-white tracking-tighter transition-colors duration-300">
                        Powerful tools for a <br className="hidden md:block" />
                        <span className="text-carbon-green">greener future.</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
                        We've built a comprehensive suite of features designed to help you understand your impact and make meaningful changes without disrupting your life.
                    </p>
                </div>

                {/* Feature 1: Intelligent Tracking */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
                    <div className="flex-1 order-2 md:order-1">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 text-2xl mb-6">🚗</div>
                        <h2 className="text-4xl font-bold mb-6">Intelligent Tracking</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 transition-colors duration-300">
                            Our app automatically detects your mode of transport—whether you're driving, taking the train, or cycling. It calculates emissions in real-time based on GPS data and vehicle type.
                        </p>
                        <ul className="space-y-4">
                            {['Automatic activity detection', 'Support for EV and Hybrid vehicles', 'Public transit integration'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                                    <div className="w-6 h-6 rounded-full bg-carbon-green/20 flex items-center justify-center text-carbon-green text-xs">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 order-1 md:order-2 bg-gray-50 dark:bg-carbon-gray border border-gray-200 dark:border-white/10 rounded-3xl h-[400px] w-full flex items-center justify-center relative overflow-hidden group shadow-xl dark:shadow-none transition-colors duration-300">
                        <img
                            src={`${import.meta.env.BASE_URL}images/intelligent-tracking.png`}
                            alt="Intelligent Tracking Map"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* Feature 2: Diet Analysis */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
                    <div className="flex-1 bg-gray-50 dark:bg-carbon-gray border border-gray-200 dark:border-white/10 rounded-3xl h-[400px] w-full flex items-center justify-center relative overflow-hidden group shadow-xl dark:shadow-none transition-colors duration-300">
                        <img
                            src={`${import.meta.env.BASE_URL}images/diet-insights.png`}
                            alt="Dietary Insights Dashboard"
                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    <div className="flex-1">
                        <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 text-2xl mb-6">🥑</div>
                        <h2 className="text-4xl font-bold mb-6">Dietary Insights</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 transition-colors duration-300">
                            Your food choices account for a significant portion of your footprint. Log your meals effortlessly and see the impact of switching to plant-based options or locally sourced ingredients.
                        </p>
                        <ul className="space-y-4">
                            {['Database of 10,000+ food items', 'Water usage tracking', 'Personalized recipe suggestions'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                                    <div className="w-6 h-6 rounded-full bg-carbon-green/20 flex items-center justify-center text-carbon-green text-xs">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Grid of Extras */}
                <h2 className="text-3xl font-bold text-center mb-12">Everything else you need</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Smart Home", desc: "Connect with smart meters to track energy usage." },
                        { title: "Offsetting", desc: "Purchase verified carbon credits directly in-app." },
                        { title: "Challenges", desc: "Join monthly community challenges to stay motivated." },
                        { title: "Teams", desc: "Create groups with family or coworkers." },
                        { title: "Export Data", desc: "Download your data in CSV or PDF format." },
                        { title: "Dark Mode", desc: "Designed to be easy on your eyes and your battery." }
                    ].map((card, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-carbon-gray p-8 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-300">
                            <h3 className="font-bold text-xl mb-3">{card.title}</h3>
                            <p className="text-gray-400">{card.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default FeaturesPage;
