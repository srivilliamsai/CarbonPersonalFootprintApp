import React, { useState, useEffect, useMemo } from 'react';
import Footer from './Footer';

const Dashboard = ({ user, onLogout, onNavigate }) => {
    const [showLogModal, setShowLogModal] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [newGoal, setNewGoal] = useState({ goalTitle: '', targetEmission: '' });
    const [logs, setLogs] = useState([]);
    const [goals, setGoals] = useState([]);
    const [badges, setBadges] = useState([]);
    const [newLog, setNewLog] = useState({ transportMode: 'none', dietType: 'none', energyEmission: '' });
    const [dailyGoal, setDailyGoal] = useState(15); // Default, can be overridden by API

    // Mock initial data for the chart if empty
    const [weeklyData, setWeeklyData] = useState([
        { day: 'Mon', val: 12 },
        { day: 'Tue', val: 8 },
        { day: 'Wed', val: 15 },
        { day: 'Thu', val: 5 },
        { day: 'Fri', val: 10 },
        { day: 'Sat', val: 4 },
        { day: 'Sun', val: 7 },
    ]);

    // Helper to format date as YYYY-MM-DD (consistent with backend LocalDate)
    const getFormattedDate = (date) => {
        const d = new Date(date);
        // Adjust for timezone offset to avoid previous day issue
        const offset = d.getTimezoneOffset();
        const adjustedDate = new Date(d.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('T')[0];
    };

    // Calculate ONLY today's total emissions
    const calculateTotal = () => {
        const today = getFormattedDate(new Date());
        return logs
            .filter(log => log.date === today)
            .reduce((acc, log) => acc + log.total, 0);
    };

    // Determine current day index (0=Mon, 6=Sun)
    const getTodayIndex = () => {
        const day = new Date().getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
        return day === 0 ? 6 : day - 1;
    };

    const [todayIndex, setTodayIndex] = useState(getTodayIndex());

    useEffect(() => {
        const fetchFeatures = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                // Fetch Logs History
                const logsRes = await fetch('http://localhost:8089/api/carbon-logs/history', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (logsRes.ok) {
                    const logsData = await logsRes.json();

                    const formattedLogs = logsData.map(log => ({
                        ...log,
                        total: log.totalEmission,
                        date: log.date // Assuming YYYY-MM-DD from backend
                    }));
                    setLogs(formattedLogs);

                    // Process logs for Weekly Chart
                    // Initialize with 0
                    const newWeekly = [
                        { day: 'Mon', val: 0 },
                        { day: 'Tue', val: 0 },
                        { day: 'Wed', val: 0 },
                        { day: 'Thu', val: 0 },
                        { day: 'Fri', val: 0 },
                        { day: 'Sat', val: 0 },
                        { day: 'Sun', val: 0 },
                    ];

                    const today = new Date();
                    // Get start of week (Monday)
                    const dayOfWeek = today.getDay(); // 0=Sun
                    const diffToMon = (dayOfWeek + 6) % 7;
                    const monday = new Date(today);
                    monday.setDate(today.getDate() - diffToMon);
                    monday.setHours(0, 0, 0, 0);

                    // Map logs to days if they strictly match the date string for that day of *this week*
                    // Simplified: We reset chart every week, or just show last 7 days?
                    // User prompt implies "Today is wed", show Wed data.
                    // We will match strictly by YYYY-MM-DD of current week days.

                    for (let i = 0; i < 7; i++) {
                        const d = new Date(monday);
                        d.setDate(monday.getDate() + i);
                        const dateStr = getFormattedDate(d);

                        // Sum logs for this specific date
                        const dayTotal = formattedLogs
                            .filter(l => l.date === dateStr)
                            .reduce((sum, l) => sum + l.totalEmission, 0);

                        newWeekly[i].val = dayTotal;
                    }
                    setWeeklyData(newWeekly);
                }

                // Fetch Goals
                const goalsRes = await fetch('http://localhost:8089/api/goals', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (goalsRes.ok) {
                    const goalsData = await goalsRes.json();
                    setGoals(goalsData);
                    // Use first active goal target if available
                    const activeGoal = goalsData.find(g => g.status === 'active');
                    if (activeGoal) setDailyGoal(activeGoal.targetEmission);
                }

                // Fetch Badges
                const badgesRes = await fetch('http://localhost:8089/api/badges', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (badgesRes.ok) setBadges(await badgesRes.json());

            } catch (err) {
                console.error("Failed to fetch features", err);
            }
        };
        fetchFeatures();
    }, []);

    const handleAddLog = async (overrideLog = null) => {
        try {
            const logToAdd = overrideLog || newLog;

            // Refined calculation logic
            let t = 0;
            if (logToAdd.transportMode === 'car') t = 2.5;
            else if (logToAdd.transportMode === 'public') t = 1.0;
            // 'bike' is 0

            let f = 0;
            if (logToAdd.dietType === 'nonveg') f = 2.5;
            else if (logToAdd.dietType === 'veg') f = 1.5;
            else if (logToAdd.dietType === 'vegan') f = 0.5;

            const e = (parseFloat(logToAdd.energyEmission) || 0) * 0.5;
            const total = t + f + e;

            // Prevent adding empty logs
            if (total === 0) return;

            const dateStr = getFormattedDate(new Date());
            const finalLog = { ...logToAdd, total, date: dateStr };

            setLogs([finalLog, ...logs]);
            setShowLogModal(false);
            // Reset state
            setNewLog({ transportMode: 'none', dietType: 'none', energyEmission: '' });

            // Update chart data for Today
            const newWeekly = [...weeklyData];
            newWeekly[todayIndex].val += total;
            setWeeklyData(newWeekly);

            const token = localStorage.getItem('token');
            await fetch('http://localhost:8089/api/carbon-logs/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...logToAdd, date: dateStr }) // Ensure date is sent if backend uses it, or let backend timestamp it
            });
        } catch (e) {
            console.error(e);
        }
    };

    // Memoized random insight to stay constant during re-renders
    const randomInsight = useMemo(() => {
        const insights = [
            { icon: '🌳', text: "A single mature tree can absorb 48 lbs of CO₂ per year." },
            { icon: '💡', text: "Switching to LED bulbs reduces energy carbon emissions by 80%." },
            { icon: '🥩', text: "Meat production contributes to 14.5% of global greenhouse gases." },
            { icon: '🚌', text: "Public transport produces 95% less CO₂ per mile than driving alone." },
            { icon: '💧', text: "Reducing shower time by 2 minutes saves 340 lbs of CO₂ per year." }
        ];
        return insights[Math.floor(Math.random() * insights.length)];
    }, []);

    const handleSetGoal = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:8089/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    goalTitle: newGoal.goalTitle,
                    targetEmission: parseFloat(newGoal.targetEmission),
                    status: 'active'
                })
            });
            if (res.ok) {
                const savedGoal = await res.json();
                setGoals([...goals, savedGoal]);
                setDailyGoal(savedGoal.targetEmission);
                setShowGoalModal(false);
                setNewGoal({ goalTitle: '', targetEmission: '' });
            }
        } catch (err) { console.error(err); }
    };

    const quickLog = (type) => {
        if (type === 'commute') handleAddLog({ transportMode: 'car', dietType: 'none', energyEmission: '0' });
        if (type === 'meal') handleAddLog({ transportMode: 'none', dietType: 'nonveg', energyEmission: '0' });
        if (type === 'energy') handleAddLog({ transportMode: 'none', dietType: 'none', energyEmission: '10' });
    };

    // Theme Toggle Logic




    // Global Emissions Counter Logic
    const [globalEmissions, setGlobalEmissions] = useState(0);
    useEffect(() => {
        // ~37.4 Billion Tonnes / Year (2024 Est) -> ~1185 tonnes/sec
        const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
        const ratePerMs = 1185 / 1000;

        const interval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startOfYear;
            setGlobalEmissions(elapsed * ratePerMs);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-carbon-green selection:text-black relative overflow-x-hidden transition-colors duration-300">

            {/* Ambient Background - Fixed */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-carbon-green/10 rounded-full blur-[120px] opacity-50 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] opacity-40"></div>
                {/* Noise Texture Overlay for grain effect */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-[1400px] mx-auto p-6 md:p-8 lg:p-12">

                {/* Header */}
                <header className="relative z-50 flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 animate-in slide-in-from-top-4 duration-700">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/60">
                            Hello, {user.name}
                        </h1>
                        <p className="text-gray-500 dark:text-white/60 font-medium">Your daily sustainability overview.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 bg-white/80 dark:bg-white/5 backdrop-blur-2xl p-2 rounded-[2rem] border border-gray-200 dark:border-white/10 shadow-2xl">
                        <button onClick={() => onNavigate('marketplace')} className="px-6 py-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all font-medium text-sm flex items-center gap-2 text-gray-700 dark:text-white/90">
                            <span className="text-lg">🛒</span> Shop
                        </button>
                        <button onClick={() => onNavigate('leaderboard')} className="px-6 py-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all font-medium text-sm flex items-center gap-2 text-gray-700 dark:text-white/90">
                            <span className="text-lg">🏆</span> Rank
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <div
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="w-11 h-11 rounded-full bg-gradient-to-b from-carbon-green to-emerald-600 flex items-center justify-center text-black font-bold shadow-lg shadow-carbon-green/20 ml-1 cursor-pointer hover:scale-105 transition-transform"
                            >
                                {user.name[0].toUpperCase()}
                            </div>

                            {showProfileMenu && (
                                <div className="absolute right-0 top-16 w-64 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-white/5">
                                        <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-lg">👤</div>
                                        <div className="overflow-hidden">
                                            <div className="font-bold text-gray-900 dark:text-white truncate">{user.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-white/50 truncate" title={user.email}>{user.email}</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={onLogout}
                                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-500 text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span>Log Out</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Main Stats - Span 8 */}
                    <div className="lg:col-span-8 bg-white dark:bg-[#111]/60 backdrop-blur-3xl border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/10 transition-colors duration-500 shadow-xl dark:shadow-none">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-carbon-green/5 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8 relative z-10">
                            <div>
                                <h3 className="text-gray-500 dark:text-white/50 font-semibold uppercase text-xs tracking-[0.2em] mb-3">Today's Emissions</h3>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-7xl md:text-8xl font-bold text-gray-900 dark:text-white tracking-tighter">
                                        {calculateTotal().toFixed(1)}
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="text-2xl text-carbon-green font-medium">kg CO₂</span>
                                        <span className="text-xs text-gray-400 dark:text-white/40">Daily Total</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="bg-gradient-to-r from-carbon-green/20 to-emerald-500/20 text-carbon-green px-5 py-2.5 rounded-full text-sm font-bold border border-carbon-green/20 backdrop-blur-md">
                                    Target: {dailyGoal} kg
                                </div>
                                <div className="w-48 bg-black/5 dark:bg-white/5 h-2 rounded-full overflow-hidden mt-2">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${calculateTotal() > dailyGoal ? 'bg-red-500' : 'bg-carbon-green'}`}
                                        style={{ width: `${Math.min((calculateTotal() / dailyGoal) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="h-48 w-full flex items-end justify-between gap-3 relative z-10 pt-4 border-t border-gray-100 dark:border-white/5">
                            {weeklyData.map((d, i) => {
                                const isToday = i === todayIndex;
                                const height = Math.min((d.val / 20) * 100, 100);
                                return (
                                    <div key={i} className="flex flex-col items-center gap-3 flex-1 group/bar cursor-pointer h-full justify-end">
                                        <div className="relative w-full flex items-end justify-center h-full">
                                            <div className="w-full max-w-[48px] bg-black/5 dark:bg-white/5 rounded-2xl h-full absolute bottom-0 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"></div>
                                            <div
                                                className={`w-[60%] lg:w-[40%] rounded-full transition-all duration-700 ease-out relative ${isToday ? 'bg-black dark:bg-white shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-black/10 dark:bg-white/20'}`}
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-xs font-bold tracking-wider ${isToday ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-white/30'}`}>{d.day}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Badges - Span 4 */}
                    <div className="lg:col-span-4 bg-white dark:bg-[#111]/60 backdrop-blur-3xl border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden hover:border-gray-300 dark:hover:border-white/10 transition-all group shadow-xl dark:shadow-none">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-gray-900 dark:text-white font-bold text-xl">Achievements</h3>
                            <span className="bg-black/5 dark:bg-white/10 text-xs font-bold px-2 py-1 rounded-md text-gray-500 dark:text-white/60">{badges.length}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {badges.length === 0 ? (
                                <div className="flex flex-col items-center justify-center w-full h-[150px] text-center opacity-40">
                                    <span className="text-3xl mb-2">🔒</span>
                                    <p className="text-sm">Start logging to unlock.</p>
                                </div>
                            ) : (
                                badges.map(badge => (
                                    <div key={badge.id} className="bg-gradient-to-b from-gray-50 to-white dark:from-white/10 dark:to-white/5 border border-gray-200 dark:border-white/10 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transform hover:scale-105 transition-transform cursor-default text-gray-800 dark:text-white">
                                        <span className="text-xl">🏆</span> {badge.badgeName}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Quick Action: Log - Span 4 */}
                    <div onClick={() => setShowLogModal(true)} className="lg:col-span-4 bg-black dark:bg-white text-white dark:text-black rounded-[2.5rem] p-8 cursor-pointer hover:scale-[1.02] transition-all shadow-2xl flex flex-col justify-between group h-full">
                        <div className="flex justify-between items-start">
                            <span className="bg-white/20 dark:bg-black/10 p-3 rounded-full text-2xl group-hover:rotate-90 transition-transform duration-500">➕</span>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50">New Entry</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold -tracking-[0.05em] leading-tight">Log custom activity</h3>
                        </div>
                    </div>

                    {/* Quick Shortcuts - Span 5 */}
                    <div className="lg:col-span-5 grid grid-cols-3 gap-4">
                        <button onClick={() => quickLog('commute')} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-[2rem] p-6 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors flex flex-col justify-center items-center gap-4 group shadow-lg dark:shadow-none">
                            <span className="text-4xl group-hover:scale-110 transition-transform">🚗</span>
                            <span className="text-gray-500 dark:text-white/60 font-medium text-xs uppercase tracking-wide">Drive</span>
                        </button>
                        <button onClick={() => quickLog('meal')} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-[2rem] p-6 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors flex flex-col justify-center items-center gap-4 group shadow-lg dark:shadow-none">
                            <span className="text-4xl group-hover:scale-110 transition-transform">🍔</span>
                            <span className="text-gray-500 dark:text-white/60 font-medium text-xs uppercase tracking-wide">M-Meal</span>
                        </button>
                        <button onClick={() => quickLog('energy')} className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/5 rounded-[2rem] p-6 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors flex flex-col justify-center items-center gap-4 group shadow-lg dark:shadow-none">
                            <span className="text-4xl group-hover:scale-110 transition-transform">⚡️</span>
                            <span className="text-gray-500 dark:text-white/60 font-medium text-xs uppercase tracking-wide">Energy</span>
                        </button>
                    </div>

                    {/* Daily Insight - Span 3 */}
                    <div className="lg:col-span-3 bg-gradient-to-br from-carbon-green/10 to-emerald-500/5 border border-carbon-green/20 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(45,181,77,0.1),transparent)] pointer-events-none"></div>
                        <div className="text-4xl mb-3 animate-bounce-slow">{randomInsight.icon}</div>
                        <h4 className="text-carbon-green font-bold text-xs uppercase tracking-widest mb-2">Did You Know?</h4>
                        <p className="text-sm text-gray-600 dark:text-white/80 leading-relaxed font-medium">
                            {randomInsight.text}
                        </p>
                    </div>

                    {/* Goal Widget - Span 12 */}
                    <div className="lg:col-span-12 bg-white dark:bg-gradient-to-r dark:from-[#1c1c1e] dark:to-[#2c2c2e] border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl dark:shadow-none">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-carbon-green/5 dark:bg-white/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-carbon-green/10 dark:group-hover:bg-white/10 transition-colors duration-700"></div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Community Challenge</h3>
                                <p className="text-gray-500 dark:text-white/60 max-w-xl">Join 10,000+ users in the "Meatless Month" challenge. Reduce your footprint by 15%.</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setShowGoalModal(true)} className="px-8 py-4 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-xl font-bold transition-colors text-gray-900 dark:text-white">Set Personal Goal</button>
                                <button className="px-8 py-4 bg-carbon-green text-black rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-carbon-green/20">Join Challenge</button>
                            </div>
                        </div>
                    </div>

                    {/* History - Bottom, Full Width */}
                    <div className="lg:col-span-12 bg-white dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-xl dark:shadow-none">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-gray-900 dark:text-white font-bold text-xl">Recent Activity</h3>
                            <button
                                onClick={() => setShowHistoryModal(true)}
                                className="text-xs font-bold text-carbon-green hover:underline cursor-pointer"
                            >
                                View All
                            </button>
                        </div>

                        {logs.length === 0 ? (
                            <div className="text-center py-10 text-gray-500 dark:text-white/30 italic border-2 border-dashed border-gray-200 dark:border-white/5 rounded-xl">
                                No activity logged yet. Start today!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {logs.slice().reverse().slice(0, 4).map((log, index) => {
                                    let icon = '⚡';
                                    let title = 'Activity';
                                    let subtitle = log.date;

                                    if (log.transportMode === 'car') { icon = '🚗'; title = 'Car Commute'; }
                                    else if (log.transportMode === 'bike') { icon = '🚲'; title = 'Bike Ride'; }
                                    else if (log.transportMode === 'public') { icon = '🚌'; title = 'Public Transit'; }
                                    else if (log.dietType === 'nonveg') { icon = '🍖'; title = 'Meat Meal'; }
                                    else if (log.dietType === 'veg') { icon = '🥗'; title = 'Vegetarian Meal'; }
                                    else if (log.dietType === 'vegan') { icon = '🌱'; title = 'Vegan Meal'; }
                                    else if (parseFloat(log.energyEmission) > 0) { icon = '⚡'; title = 'Energy Usage'; }

                                    return (
                                        <div key={index} className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-transparent dark:border-white/5">
                                            <div className="w-12 h-12 rounded-full bg-white dark:bg-black/20 flex items-center justify-center text-xl shadow-sm">
                                                {icon}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-gray-900 dark:text-white">{title}</div>
                                                <div className="text-xs text-gray-500 dark:text-white/40">{subtitle}</div>
                                            </div>
                                            <div className="ml-auto font-mono text-sm font-bold text-carbon-green">
                                                +{log.totalEmission ? log.totalEmission.toFixed(1) : log.total.toFixed(1)} <span className="text-[10px]">kg</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                </div>

                {/* NEW GLOBAL CARBON PULSE SECTION */}
                {/* NEW GLOBAL CARBON PULSE SECTION */}
                <div className="mt-12 bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center text-white">
                    {/* Dynamic Background */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30">
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,50,50,0.1),transparent_70%)] animate-pulse-slow"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-block bg-red-500/10 text-red-500 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-6 border border-red-500/20 animate-pulse">
                            Live Global Data
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-4">World Carbon Watch</h2>
                        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Estimated total global CO₂ emissions accumulated since the start of this year.</p>

                        <div className="font-mono text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-6 tabular-nums break-words">
                            {Math.floor(globalEmissions).toLocaleString()}
                        </div>

                        <div className="text-xl text-gray-500 font-medium">Tonnes of CO₂ emitted in {new Date().getFullYear()}</div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                <div className="text-sm text-gray-400 mb-1">Global Rate</div>
                                <div className="text-2xl font-bold text-white">~1,185 t/sec</div>
                                <div className="text-xs text-gray-500 mt-2">Based on 37.4Gt annual estimate</div>

                            </div>
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                <div className="text-sm text-gray-400 mb-1">Top Contributor</div>
                                <div className="text-2xl font-bold text-white">Energy Sector</div>
                                <div className="text-xs text-gray-500 mt-2">~73% of global greenhouse gases</div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                                <div className="text-sm text-gray-400 mb-1">Atmospheric CO₂</div>
                                <div className="text-2xl font-bold text-white">421 PPM</div>
                                <div className="text-xs text-gray-500 mt-2">Record high in human history</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Added to Dashboard */}
                <div className="mt-20">
                    <Footer onNavigate={onNavigate} />
                </div>

            </div>

            {showHistoryModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowHistoryModal(false)}></div>
                    <div className="relative bg-[#1a1a1a] border border-white/10 rounded-[2rem] w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#1a1a1a]">
                            <h3 className="text-white font-bold text-xl">Full Activity History</h3>
                            <button onClick={() => setShowHistoryModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white">✕</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        <th className="pb-4 pl-4">Date</th>
                                        <th className="pb-4">Activity</th>
                                        <th className="pb-4">Details</th>
                                        <th className="pb-4 text-right pr-4">Impact</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {logs.slice().reverse().map((log, i) => {
                                        let title = 'Activity';
                                        let detail = '-';
                                        if (log.transportMode && log.transportMode !== 'none') {
                                            title = 'Transport'; detail = log.transportMode;
                                        } else if (log.dietType && log.dietType !== 'none') {
                                            title = 'Diet'; detail = log.dietType;
                                        } else if (log.energyEmission > 0) {
                                            title = 'Energy'; detail = `${log.energyEmission} kWh`;
                                        }

                                        return (
                                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-4 pl-4 text-gray-400">{log.date || 'Today'}</td>
                                                <td className="py-4 font-bold text-white">{title}</td>
                                                <td className="py-4 text-gray-400 capitalize">{detail}</td>
                                                <td className="py-4 text-right pr-4 font-mono font-bold text-carbon-green">+{log.totalEmission ? log.totalEmission.toFixed(2) : (log.total ? log.total.toFixed(2) : 0)} kg</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {logs.length === 0 && (
                                <div className="text-center py-12 text-gray-500">No history available yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showLogModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowLogModal(false)}></div>
                    <div className="relative bg-[#1a1a1a] border border-white/10 rounded-[2rem] w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-bold text-xl">Log Activity</h3>
                            <button onClick={() => setShowLogModal(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white">✕</button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Transport</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['car', 'public', 'bike'].map(mode => (
                                        <button
                                            key={mode}
                                            onClick={() => setNewLog({ ...newLog, transportMode: newLog.transportMode === mode ? 'none' : mode })}
                                            className={`p-3 rounded-xl border font-bold capitalize transition-all ${newLog.transportMode === mode ? 'bg-carbon-green text-black border-carbon-green' : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10'}`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Diet</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['nonveg', 'veg', 'vegan'].map(diet => (
                                        <button
                                            key={diet}
                                            onClick={() => setNewLog({ ...newLog, dietType: newLog.dietType === diet ? 'none' : diet })}
                                            className={`p-3 rounded-xl border font-bold capitalize transition-all ${newLog.dietType === diet ? 'bg-carbon-green text-black border-carbon-green' : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10'}`}
                                        >
                                            {diet}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Energy (kWh)</label>
                                <input
                                    type="number"
                                    value={newLog.energyEmission}
                                    onChange={(e) => setNewLog({ ...newLog, energyEmission: e.target.value })}
                                    placeholder="0"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-carbon-green transition-colors"
                                />
                            </div>

                            <button onClick={() => handleAddLog()} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors">
                                Save Entry
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showGoalModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowGoalModal(false)}></div>
                    <div className="relative bg-[#1a1a1a] border border-white/10 rounded-[2rem] w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <h3 className="text-white font-bold text-xl mb-6">Set Daily Goal</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Goal Title (e.g., Cycle to Work)"
                                value={newGoal.goalTitle}
                                onChange={(e) => setNewGoal({ ...newGoal, goalTitle: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-carbon-green transition-colors"
                            />
                            <input
                                type="number"
                                placeholder="Target Limit (kg CO2)"
                                value={newGoal.targetEmission}
                                onChange={(e) => setNewGoal({ ...newGoal, targetEmission: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-carbon-green transition-colors"
                            />
                            <button onClick={handleSetGoal} className="w-full bg-carbon-green text-black font-bold py-4 rounded-xl hover:bg-[#25a043] transition-colors">
                                Set Goal
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;
