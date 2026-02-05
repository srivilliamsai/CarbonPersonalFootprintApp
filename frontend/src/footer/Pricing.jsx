import React, { useState } from 'react';
import Footer from '../Footer';

const Pricing = ({ onNavigate }) => {
    const [billing, setBilling] = useState('monthly'); // 'monthly' | 'yearly'

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
                        <span className="relative z-10 flex flex-col items-start md:flex-row md:items-center md:gap-1 leading-none md:leading-normal">
                            <span>Carbon</span>
                            <span>Personal Footprint</span>
                        </span>
                    </div>
                    <div className="font-bold text-sm md:text-xl tracking-tight text-gray-500">Pricing</div>
                </div>
            </nav>

            <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">Simple, transparent pricing.</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 transition-colors duration-300">Choose the plan that fits your sustainability journey.</p>

                {/* Billing Toggle */}
                <div className="flex justify-center items-center gap-4 mb-16">
                    <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>Monthly</span>
                    <button
                        onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
                        className="w-14 h-8 bg-gray-200 dark:bg-white/10 rounded-full relative transition-colors hover:bg-gray-300 dark:hover:bg-white/20"
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-carbon-green rounded-full transition-all duration-300 ${billing === 'monthly' ? 'left-1' : 'left-7'}`}></div>
                    </button>
                    <span className={`text-sm font-medium ${billing === 'yearly' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                        Yearly <span className="text-carbon-green text-xs bg-carbon-green/10 px-2 py-0.5 rounded ml-1">Save 20%</span>
                    </span>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-32">

                    {/* Free */}
                    <div className="bg-gray-50 dark:bg-carbon-gray border border-gray-200 dark:border-white/10 p-10 rounded-[2rem] flex flex-col hover:border-gray-300 dark:hover:border-white/30 transition-all duration-300 hover:-translate-y-2 shadow-xl dark:shadow-none">
                        <h3 className="text-2xl font-bold mb-2">Starter</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">For individuals just starting out.</p>
                        <div className="text-5xl font-bold mb-8">$0</div>
                        <button className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl mb-8 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">Get Started</button>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm flex-1 transition-colors duration-300">
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Basic Emission Tracking</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Monthly Reports</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Access to Community</li>
                        </ul>
                    </div>

                    {/* Pro */}
                    <div className="bg-white dark:bg-[#1c1c1e] border-2 border-carbon-green p-10 rounded-[2rem] flex flex-col relative shadow-2xl shadow-carbon-green/10 transform md:scale-110 z-10 transition-colors duration-300">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-carbon-green text-black text-xs font-bold px-4 py-1 rounded-b-lg uppercase tracking-wider">Recommended</div>
                        <h3 className="text-2xl font-bold mb-2">Pro</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">For dedicated eco-warriors.</p>
                        <div className="text-5xl font-bold mb-8">
                            ${billing === 'monthly' ? '9' : '7'}
                            <span className="text-lg font-normal text-gray-500">/mo</span>
                        </div>
                        <button className="w-full py-4 bg-carbon-green text-black font-bold rounded-xl mb-8 hover:bg-opacity-90 transition-colors shadow-lg shadow-carbon-green/20">Start Free Trial</button>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm flex-1 transition-colors duration-300">
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Everything in Starter</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Advanced Analytics & Trends</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Unlimited Goal Setting</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Priority Support</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Apple Watch App</li>
                        </ul>
                    </div>

                    {/* Team */}
                    <div className="bg-gray-50 dark:bg-carbon-gray border border-gray-200 dark:border-white/10 p-10 rounded-[2rem] flex flex-col hover:border-gray-300 dark:hover:border-white/30 transition-all duration-300 hover:-translate-y-2 shadow-xl dark:shadow-none">
                        <h3 className="text-2xl font-bold mb-2">Family</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">For households and small groups.</p>
                        <div className="text-5xl font-bold mb-8">
                            ${billing === 'monthly' ? '19' : '15'}
                            <span className="text-lg font-normal text-gray-500">/mo</span>
                        </div>
                        <button className="w-full py-4 bg-black/5 dark:bg-white/10 text-black dark:text-white font-bold rounded-xl mb-8 hover:bg-black/10 dark:hover:bg-white/20 transition-colors">Contact Sales</button>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm flex-1 transition-colors duration-300">
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Up to 6 Pro Accounts</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Household Aggregation</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Family Challenges</li>
                            <li className="flex gap-3"><span className="text-carbon-green">✓</span> Unified Billing</li>
                        </ul>
                    </div>
                </div>

                {/* FAQs */}
                <div className="max-w-3xl mx-auto text-left">
                    <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-8">
                        {[
                            { q: "Can I cancel anytime?", a: "Yes, absolutely. There are no long-term commitments for the monthly plan." },
                            { q: "How accurate is the data?", a: "We use the latest emission factors from government databases (EPA, DEFRA) and update them quarterly." },
                            { q: "Is there a student discount?", a: "Yes! Students get 50% off the Pro plan with a valid .edu email address." }
                        ].map((item, i) => (
                            <div key={i} className="border-b border-gray-200 dark:border-white/10 pb-8 transition-colors duration-300">
                                <h4 className="text-xl font-bold mb-4">{item.q}</h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Pricing;
