import React from 'react';
import Footer from '../Footer';

const API = ({ onNavigate }) => {
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
                    <div className="hidden md:block font-bold text-xl tracking-tight text-gray-500">API Reference</div>
                    <div className="w-24"></div>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-12 text-yellow-800 dark:text-yellow-200 transition-colors duration-300">
                    <strong>BETA Access:</strong> Our API is currently in closed beta. <a href="#" className="underline">Request an access key</a>.
                </div>

                <h1 className="text-5xl font-bold mb-6">Carbon API</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 transition-colors duration-300">
                    Programmatically access carbon emission data and user stats.
                </p>

                <div className="space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                            All API requests must include your API key in the <code>Authorization</code> header.
                        </p>
                        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto">
                            <span className="text-blue-400">curl</span> https://api.carbonapp.com/v1/user/stats \<br />
                            &nbsp;&nbsp;<span className="text-blue-400">-H</span> <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Get User Footprint</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded font-mono text-sm font-bold">GET</span>
                            <span className="font-mono text-gray-600 dark:text-gray-300 transition-colors duration-300">/v1/footprint</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">Returns the authenticated user's carbon footprint data for a specific date range.</p>
                        <div className="bg-[#1e1e1e] p-6 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto text-gray-300">
                            {`{
  "total_emissions": 1250.5,
  "unit": "kg_co2",
  "breakdown": {
    "transport": 800.0,
    "diet": 300.5,
    "home": 150.0
  }
}`}
                        </div>
                    </div>
                </div>

            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default API;
