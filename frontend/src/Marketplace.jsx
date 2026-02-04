import React, { useState, useEffect } from 'react';

const Marketplace = ({ onBack }) => {
    const [items, setItems] = useState([]);
    const [userBalance, setUserBalance] = useState(100); // Mock balance

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch('http://localhost:8089/api/marketplace');
            if (res.ok) setItems(await res.json());
        };
        fetchItems();
    }, []);

    const handleBuy = async (item) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:8089/api/marketplace/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ marketplaceItem: item, amount: 1 })
            });
            if (res.ok) {
                alert(`Purchased ${item.itemName}!`);
                setUserBalance(prev => prev - item.price);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-carbon-dark p-6 md:p-10 text-gray-900 dark:text-white font-sans transition-colors duration-300">
            <div className="bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 max-w-5xl mx-auto shadow-2xl relative overflow-hidden transition-colors duration-300">
                <button onClick={onBack} className="mb-8 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">← Back</button>

                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">Marketplace</h1>
                    <div className="bg-carbon-green/10 text-carbon-green px-4 py-2 rounded-full font-bold border border-carbon-green/20">
                        Credits: {userBalance}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-6 group hover:bg-gray-100 dark:hover:bg-white/10 transition-all hover:scale-[1.02]">
                            <div className="text-4xl mb-4 bg-white dark:bg-white/10 w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm">{item.itemType === 'tree_planting' ? '🌳' : '💎'}</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.itemName}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 h-12 leading-relaxed">{item.description}</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="font-bold text-lg text-gray-900 dark:text-white">{item.price} Credits</span>
                                <button
                                    onClick={() => handleBuy(item)}
                                    className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform active:scale-95 shadow-md"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
