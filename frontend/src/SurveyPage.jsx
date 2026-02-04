import React, { useState } from 'react';

const SurveyPage = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        transportMode: 'car',
        dietType: 'nonveg',
        energyUsage: '',
        frequency: 'daily'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:8089/api/survey/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("Survey Saved!");
                if (onComplete) onComplete();
            } else {
                alert("Failed to save survey");
            }
        } catch (err) {
            console.error(err);
            alert("Error saving survey");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-carbon-dark p-6 md:p-10 text-gray-900 dark:text-white font-sans flex items-center justify-center transition-colors duration-300">
            <div className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-carbon-green/10 rounded-full blur-[80px]"></div>

                <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Lifestyle Survey</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Help us calculate your baseline carbon footprint.</p>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Primary Transport Mode</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['car', 'public', 'bike'].map(mode => (
                                <button
                                    type="button"
                                    key={mode}
                                    onClick={() => setFormData({ ...formData, transportMode: mode })}
                                    className={`py-3 rounded-xl border font-medium transition-all ${formData.transportMode === mode ? 'bg-black dark:bg-white text-white dark:text-black border-transparent' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Diet Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {['nonveg', 'veg', 'vegan'].map(diet => (
                                <button
                                    type="button"
                                    key={diet}
                                    onClick={() => setFormData({ ...formData, dietType: diet })}
                                    className={`py-3 rounded-xl border font-medium transition-all ${formData.dietType === diet ? 'bg-black dark:bg-white text-white dark:text-black border-transparent' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-200 dark:hover:bg-white/10'}`}
                                >
                                    {diet === 'nonveg' ? 'Meat' : diet.charAt(0).toUpperCase() + diet.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Monthly Energy Usage (kWh)</label>
                        <input
                            type="number"
                            required
                            placeholder="e.g. 150"
                            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-carbon-green/50 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                            value={formData.energyUsage}
                            onChange={(e) => setFormData({ ...formData, energyUsage: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Frequency</label>
                        <select
                            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 outline-none transition-all"
                            value={formData.frequency}
                            onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full py-4 rounded-xl font-bold bg-carbon-green text-black hover:bg-[#28b84d] transition-transform active:scale-95 shadow-lg shadow-carbon-green/20 mt-8">
                        Submit & Start Tracking
                    </button>

                    <button type="button" onClick={onComplete} className="w-full text-center text-gray-500 hover:text-gray-900 dark:hover:text-white mt-4 text-sm transition-colors">
                        Skip for now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SurveyPage;
