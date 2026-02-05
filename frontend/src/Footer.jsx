import React from 'react';
import { useTheme } from './hooks/useTheme.jsx';

const Footer = ({ onNavigate }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <footer id="footer" className="border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-carbon-gray/30 pt-20 pb-10 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 text-gray-600 dark:text-gray-400">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <img src={`${import.meta.env.BASE_URL}logo-dark.png`} alt="Carbon Footprint Logo" className="h-8 w-8 object-contain hidden dark:block" />
                        <img src={`${import.meta.env.BASE_URL}logo-light.png`} alt="Carbon Footprint Logo" className="h-8 w-8 object-contain block dark:hidden" />
                        <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-col items-start md:block leading-none md:leading-normal">
                            <span>Carbon</span>
                            <span>Personal Footprint</span>
                        </div>
                    </div>
                    <p className="leading-relaxed">
                        Empowering individuals to take control of their environmental impact through data and design.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-gray-900 dark:text-white">Product</h4>
                    <ul className="space-y-4">
                        <li><button onClick={() => onNavigate('features')} className="hover:text-carbon-green transition-colors text-left">Features</button></li>
                        <li><button onClick={() => onNavigate('integrations')} className="hover:text-carbon-green transition-colors text-left">Integrations</button></li>
                        <li><button onClick={() => onNavigate('pricing')} className="hover:text-carbon-green transition-colors text-left">Pricing</button></li>
                        <li><button onClick={() => onNavigate('api')} className="hover:text-carbon-green transition-colors text-left">API</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-gray-900 dark:text-white">Company</h4>
                    <ul className="space-y-4">
                        <li><button onClick={() => onNavigate('about')} className="hover:text-carbon-green transition-colors text-left">About</button></li>
                        <li><button onClick={() => onNavigate('blog')} className="hover:text-carbon-green transition-colors text-left">Blog</button></li>
                        <li><button onClick={() => onNavigate('press')} className="hover:text-carbon-green transition-colors text-left">Press</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-gray-900 dark:text-white">Legal</h4>
                    <ul className="space-y-4">
                        <li><button onClick={() => onNavigate('privacy')} className="hover:text-carbon-green transition-colors text-left">Privacy</button></li>
                        <li><button onClick={() => onNavigate('terms')} className="hover:text-carbon-green transition-colors text-left">Terms</button></li>
                        <li><button onClick={() => onNavigate('security')} className="hover:text-carbon-green transition-colors text-left">Security</button></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 dark:text-gray-600 text-sm">
                <p>&copy; 2026 Carbon Personal Footprint. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0 items-center">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors mr-4"
                        aria-label="Toggle Dark Mode"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <a href="#" className="hover:text-carbon-green dark:hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-carbon-green dark:hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-carbon-green dark:hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
