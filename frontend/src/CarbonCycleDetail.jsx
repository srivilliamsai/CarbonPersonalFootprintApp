import React, { useEffect } from 'react';

const CarbonCycleDetail = ({ topic, onBack }) => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const content = {
        production: {
            title: "Production",
            heroTitle: "The Sources of Emissions",
            icon: "🏭",
            color: "from-orange-500 to-red-600",
            description: "Carbon dioxide (CO₂) is being released at a rate faster than at any point in the last 66 million years. Human industrial activity has fundamentally altered the atmospheric balance.",
            sections: [
                {
                    title: "The Fossil Fuel Engine",
                    text: "Since the Industrial Revolution, we have burned coal, oil, and gas to power the modern world. This process releases carbon that was sequestered underground for millions of years. In 2023 alone, global energy-related CO2 emissions reached a record high of 37.4 billion tonnes. Coal remains the largest single source of emissions, accounting for over 40% of the total, followed closely by oil and natural gas."
                },
                {
                    title: "Industrial Manufacturing",
                    text: "Manufacturing materials like steel, cement, and chemicals is incredibly energy-intensive. Concrete production alone contributes to 8% of global CO2 emissions—if the cement industry were a country, it would be the third-largest emitter in the world. Steel production is similarly carbon-heavy, relying on coal-fired blast furnaces to melt iron ore."
                },
                {
                    title: "Transportation Systems",
                    text: "The global transport sector accounts for nearly a quarter of direct CO2 emissions from fuel combustion. Road vehicles—cars, trucks, buses, and two-wheelers—account for nearly three-quarters of transport CO2 emissions. Aviation and shipping, while smaller shares, are among the hardest sectors to decarbonize and are growing rapidly as global trade and travel increase."
                },
                {
                    title: "The Digital Footprint",
                    text: "The internet is not invisible. Data centers, which power everything from cloud storage to AI models, consume roughly 1-1.5% of global electricity use. As AI adoption grows, this energy demand is projected to double by 2026. Every search, every stream, and every cryptocurrency transaction carries a carbon cost, often powered by fossil-heavy grids."
                },
                {
                    title: "The Agriculture Factor",
                    text: "It's not just smokestacks. Industrial agriculture contributes significantly, not just through CO2, but through methane (livestock) and nitrous oxide (fertilizers). Methane is 80 times more potent than CO2 at warming the planet over a 20-year period. Furthermore, deforestation for farming removes the planet's natural ability to absorb these emissions, creating a dangerous feedback loop."
                }
            ]
        },
        impact: {
            title: "Impact",
            heroTitle: "A Warming Planet",
            icon: "🌡️",
            color: "from-red-500 to-red-900",
            description: "The consequences are no longer theoretical. We are seeing real-time disruptions to the climate systems that civilization relies on.",
            sections: [
                {
                    title: "Global Temperature Rise",
                    text: "The planet has warmed by approximately 1.1°C since the late 19th century. The last decade (2011-2020) was the warmest on record. This heat energy is powering more destructive storms and heatwaves globally. We are rapidly approaching the 1.5°C tipping point, beyond which climate impacts become increasingly irreversible and catastrophic."
                },
                {
                    title: "Melting Ice & Rising Seas",
                    text: "Antarctica and Greenland are losing ice mass at an accelerating rate. As oceans warm, they also expand thermally. This combination threatens coastal cities with chronic flooding. By 2100, sea levels could rise by up to 1 meter, potentially displacing hundreds of millions of people in low-lying areas like Bangladesh, Florida, and the Pacific Islands."
                },
                {
                    title: "Human Health Crisis",
                    text: "Climate change is a health emergency. Extreme heat kills more people annually than hurricanes, floods, and tornadoes combined. Warmer temperatures are also expanding the range of vector-borne diseases like malaria, dengue, and Lyme disease. Additionally, wildfire smoke and increased ground-level ozone are worsening respiratory conditions like asthma worldwide."
                },
                {
                    title: "Economic Consequences",
                    text: "Climate change is a threat multiplier for the global economy. Supply chains are disrupted by extreme weather, insurance premiums in vulnerable areas are skyrocketing, and agricultural yields are threatened by drought and changing weather patterns. The cost of inaction is estimated to be tens of trillions of dollars by the end of the century."
                },
                {
                    title: "Biodiversity Collapse",
                    text: "Species are going extinct at 1,000 times the natural background rate. Coral reefs, which support 25% of all marine life, are bleaching and dying due to ocean acidification and heat stress. We are witnessing the onset of the Sixth Mass Extinction, driven entirely by human activity."
                }
            ]
        },
        solution: {
            title: "Solution",
            heroTitle: "The Path to Net Zero",
            icon: "♻️",
            color: "from-green-500 to-emerald-700",
            description: "We have the technology today to solve this. The transition to a green economy is not just necessary for survival—it's an economic opportunity.",
            sections: [
                {
                    title: "The Renewable Revolution",
                    text: "Solar power is now the cheapest electricity in history. Wind and battery storage costs have plummeted by 85% in the last decade. We are rapidly replacing fossil fuel generation with clean, infinite energy from the sun and wind. In 2023, renewable energy capacity additions grew by 50% globally, the fastest growth rate in two decades."
                },
                {
                    title: "Electrify Everything",
                    text: "By replacing gas cars with EVs and gas boilers with heat pumps, we can power our lives with clean electricity. Electric motors are 3-4x more efficient than combustion engines, meaning we use less energy overall. Heat pumps are essentially 'magic' technology, moving heat rather than creating it, achieving efficiencies of over 300%."
                },
                {
                    title: "Nature-Based Solutions",
                    text: "Restoring forests, peatlands, and mangroves can absorb massive amounts of carbon. Regenerative agriculture practices—like cover cropping and no-till farming—can turn soil into a carbon sink rather than a source. Protecting existing old-growth forests is the single most effective near-term nature-based climate solution."
                },
                {
                    title: "Policy & Carbon Pricing",
                    text: "Technology alone isn't enough; we need systemic change. Carbon pricing mechanisms, like carbon taxes or cap-and-trade systems, force companies to pay for their pollution, incentivizing them to switch to cleaner alternatives. Government subsidies for fossil fuels must end and be redirected to accelerate the green transition."
                },
                {
                    title: "Individual Action",
                    text: "While systemic change is crucial, individual choices signal market demand. Eating a plant-rich diet, flying less, switching to a green energy provider, and voting for climate-conscious leaders are powerful tools. The 'Carbon Personal Footprint' app is designed to help you navigate these choices and visualize your contribution to the solution."
                }
            ]
        }
    };

    const data = content[topic];

    if (!data) return null;

    // Custom Visualizations for each topic
    const renderVisual = () => {
        if (topic === 'production') {
            return (
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-12 backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-8 text-center">Global Emissions by Sector</h3>
                    <div className="space-y-6">
                        {[
                            { label: "Electricity & Heat", val: "31%", w: "31%", col: "bg-red-500" },
                            { label: "Transportation", val: "16%", w: "16%", col: "bg-orange-500" },
                            { label: "Manufacturing", val: "12%", w: "12%", col: "bg-yellow-500" },
                            { label: "Agriculture", val: "11%", w: "11%", col: "bg-green-600" },
                            { label: "Buildings", val: "7%", w: "7%", col: "bg-blue-500" }
                        ].map((item, i) => (
                            <div key={i} className="relative">
                                <div className="flex justify-between text-sm mb-2 text-gray-300">
                                    <span className="font-bold">{item.label}</span>
                                    <span>{item.val}</span>
                                </div>
                                <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.col} rounded-full animate-in slide-in-from-left duration-1000`}
                                        style={{ width: item.w, animationDelay: `${i * 100}ms` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (topic === 'impact') {
            return (
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-12 backdrop-blur-md relative overflow-hidden">
                    <h3 className="text-2xl font-bold mb-8 text-center">Global Temperature Anomaly</h3>
                    <div className="flex items-end justify-center gap-2 h-64 md:h-80 w-full px-4">
                        {[10, 15, 12, 20, 25, 35, 40, 55, 60, 75, 90, 100].map((h, i) => (
                            <div key={i} className="group relative w-full h-full flex flex-col justify-end">
                                <div
                                    className="w-full bg-gradient-to-t from-yellow-500/50 to-red-600 rounded-t-lg hover:to-red-400 transition-all duration-500"
                                    style={{
                                        height: `${h}%`,
                                        animation: `grow-up 1s ease-out forwards ${i * 100}ms`,
                                        opacity: 0
                                    }}
                                >
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold bg-black px-2 py-1 rounded">
                                        +{h / 20}°C
                                    </div>
                                </div>
                                <style>{`
                                    @keyframes grow-up {
                                        0% { height: 0; opacity: 0; }
                                        100% { height: ${h}%; opacity: 1; }
                                    }
                                `}</style>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
                        <span>1880</span>
                        <span>1950</span>
                        <span>2024</span>
                    </div>
                </div>
            );
        } else if (topic === 'solution') {
            return (
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-12 backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-8 text-center">Plummeting Cost of Solar Energy</h3>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="relative w-48 h-48 rounded-full border-4 border-white/10 flex items-center justify-center bg-black/20">
                            <div className="text-center">
                                <div className="text-sm text-gray-500 mb-1">2010</div>
                                <div className="text-3xl font-bold text-gray-300">$378</div>
                                <div className="text-xs text-gray-600">per MWh</div>
                            </div>
                        </div>
                        <div className="text-4xl text-carbon-green animate-bounce">
                            ➔
                        </div>
                        <div className="relative w-48 h-48 rounded-full border-4 border-carbon-green flex items-center justify-center bg-carbon-green/10 shadow-[0_0_50px_rgba(45,181,77,0.3)]">
                            <div className="text-center">
                                <div className="text-sm text-carbon-green mb-1 font-bold">Today</div>
                                <div className="text-5xl font-bold text-white">$37</div>
                                <div className="text-xs text-carbon-green">per MWh</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-gray-400 mt-8 text-sm">Solar energy costs have dropped by nearly <span className="text-white font-bold">90%</span> in just 15 years.</p>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-carbon-green selection:text-black font-sans animate-in fade-in duration-500">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="font-medium">Back to Home</span>
                    </button>
                    <div className="font-bold text-xl tracking-tight text-carbon-green">The Carbon Cycle</div>
                    <div className="w-24"></div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-40 pb-20 px-6 overflow-hidden">
                <div className={`absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b ${data.color} opacity-20 rounded-full blur-[120px] -z-10 animate-pulse-slow`}></div>

                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block p-6 rounded-[2rem] bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-2xl animate-in zoom-in-50 duration-700 hover:scale-110 transition-transform">
                        <div className="text-8xl">{data.icon}</div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 leading-tight">{data.title}</h1>
                    <p className="text-2xl md:text-3xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed">{data.description}</p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-6 pb-32">

                {/* Visual Graph Section */}
                {renderVisual()}

                <div className="grid gap-8">
                    {data.sections.map((section, index) => (
                        <div key={index} className="bg-carbon-gray border border-white/5 rounded-[2.5rem] p-10 md:p-14 hover:border-white/10 transition-all duration-300 group relative overflow-hidden">
                            {/* Hover Gradient Effect */}
                            <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${data.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                            <h2 className={`text-3xl md:text-4xl font-bold mb-6 group-hover:translate-x-2 transition-transform duration-300`}>
                                {section.title}
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {section.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer Quote */}
                <div className="mt-20 text-center border-t border-white/5 pt-16">
                    <p className="text-gray-500 italic text-xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        "The greatest threat to our planet is the belief that someone else will save it."
                    </p>
                </div>
            </div>

        </div>
    );
};

export default CarbonCycleDetail;
