import React, { useState, useEffect } from 'react';
import Footer from '../Footer';

const Blog = ({ onNavigate }) => {
    const [selectedPost, setSelectedPost] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedPost]);

    const posts = [
        {
            id: 1,
            category: "Guide",
            title: "10 Simple ways to reduce your footprint at home using smart tech.",
            excerpt: "You don't need solar panels to make a difference. Start with these small changes to your daily routine...",
            image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop",
            content: (
                <>
                    <p className="mb-6">Smart home technology has revolutionized how we manage energy consumption. From smart thermostats that learn your schedule to automated lighting systems, the opportunities to save energy are endless. By integrating these systems, you not only reduce your carbon footprint but also save significantly on utility bills.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Smart Thermostats</h3>
                    <p className="mb-6">Heating and cooling account for nearly half of a home's energy use. A smart thermostat can reduce this by 10-15% simply by adjusting temperatures when you're asleep or away. Models like Nest or Ecobee learn your habits over time, automatically optimizing your HVAC system for maximum efficiency without sacrificing comfort.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Energy Monitoring Plugs</h3>
                    <p className="mb-6">Identify "vampire devices" that drain power even when turned off. Smart plugs allow you to cut power to these devices completely via your phone. You can set schedules for coffee makers, gaming consoles, and TVs, ensuring they draw zero watts when not in use.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Automated Lighting Systems</h3>
                    <p className="mb-6">LED bulbs are great, but smart LEDs are better. With motion sensors and scheduling, lights never stay on in an empty room. Connected systems can also adjust brightness based on the time of day, further reducing energy consumption.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Smart Water Leak Detectors</h3>
                    <p className="mb-6">Water heating is another major energy hog. Smart leak detectors prevents wastage, and smart showerheads can track your water usage in real-time, gamifying conservation for the whole family.</p>

                    <p>By implementing just these changes, the average household can reduce their carbon footprint by over 1.5 tons of CO2 per year while enjoying a more convenient, modern living space.</p>
                </>
            )
        },
        {
            id: 2,
            category: "Food",
            title: "The carbon impact of your coffee habit (and how to fix it).",
            excerpt: "From bean to cup, tracing the environmental journey of your morning brew.",
            image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
            content: (
                <>
                    <p className="mb-6">Coffee is one of the most popular beverages in the world, but its carbon footprint is significant. The journey from farm to cup involves deforestation, water usage, and transportation emissions. However, for most of us, giving up coffee isn't an option. Here is how to make your habit sustainable.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">The Milk Factor</h3>
                    <p className="mb-6">Surprisingly, for a latte, the milk accounts for about 70% of the carbon footprint. Switching to plant-based options like oat or soy milk can drastically reduce the impact. Almond milk is also lower carbon but has a higher water footprint.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Brewing Method Matters</h3>
                    <p className="mb-6">Using a french press or pour-over consumes less energy than an electric coffee maker. Pod machines create immense plastic waste, though some brands now offer recyclable aluminum pods. If you use a kettle, boiling only the water you need is a simple way to save energy.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Sourcing and Certification</h3>
                    <p className="mb-6">Look for Shade-Grown and Bird-Friendly certifications. These methods preserve local biodiversity and prevent deforestation. Fair Trade certification also ensures farmers are paid a living wage, which often correlates with better environmental stewardship.</p>

                    <p>Finally, bring your own reusable cup. The paper cups used by coffee shops are lined with plastic and are rarely recycled. A reusable cup pays for its carbon cost after just 15 uses.</p>
                </>
            )
        },
        {
            id: 3,
            category: "Travel",
            title: "Why train travel is experiencing a renaissance in Europe.",
            excerpt: "High-speed rail is faster, greener, and more comfortable than short-haul flights.",
            image: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=800&auto=format&fit=crop",
            content: (
                <>
                    <p className="mb-6">Europe is investing billions in high-speed rail networks, aiming to triple traffic by 2050. This shift is essential for decarbonizing the transport sector, which remains one of the largest contributors to global emissions.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Speed vs. Flight</h3>
                    <p className="mb-6">On routes like Paris to London or Milan to Rome, trains are now center-to-center competitive with planes. When you factor in airport security lines, transfer times, and boarding, the train is often faster door-to-door.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">The Night Train Renaissance</h3>
                    <p className="mb-6">Sleeper trains are making a comeback. Companies like Nightjet are launching new routes connecting major capitals. You sleep while you travel, saving on a hotel bill and waking up refreshed in a new city center.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">The Comfort Factor</h3>
                    <p className="mb-6">Legroom, dining cars, and the ability to walk around make train travel infinitely more civilized than cramped economy flights. Plus, the view of the countryside beats a view of clouds any day.</p>

                    <p>A train journey emits up to 90% less CO2 per passenger kilometer compared to a short-haul flight. It is the single most effective change a traveler can make.</p>
                </>
            )
        },
        {
            id: 4,
            category: "Energy",
            title: "Understanding the difference between Green and Blue Hydrogen.",
            excerpt: "Not all hydrogen is created equal. A deep dive into the color spectrum of clean energy.",
            image: "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?q=80&w=800&auto=format&fit=crop",
            content: (
                <>
                    <p className="mb-6">Hydrogen is touted as the fuel of the future, essential for decarbonizing heavy industries like steel, shipping, and trucking. But its environmental impact depends entirely on how it's produced.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Green Hydrogen</h3>
                    <p className="mb-6">Produced via electrolysis using renewable energy (wind/solar). It splits water into hydrogen and oxygen. It has zero carbon emissions but is currently expensive to produce due to the high cost of electrolyzers and clean power.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Blue Hydrogen</h3>
                    <p className="mb-6">Produced from natural gas (methane), with the resulting CO2 captured and stored underground. It is a transitional fuel. However, critics argue that methane leaks during extraction and imperfect carbon capture rates make it far less "clean" than advertised.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Grey and Brown Hydrogen</h3>
                    <p className="mb-6">Currently the most common forms. Produced from natural gas or coal without any carbon capture. These methods are highly polluting and are part of the problem, not the solution.</p>

                    <p>The transition to a Green Hydrogen economy is critical. As renewable energy costs fall, Green Hydrogen will become the standard, aiming to replace fossil fuels in sectors that batteries cannot easily power.</p>
                </>
            )
        },
        {
            id: 5,
            category: "Lifestyle",
            title: "Minimalism: How owning less actually lets you live more.",
            excerpt: "The intersection of mental clarity and environmental responsibility.",
            image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=800&auto=format&fit=crop",
            content: (
                <>
                    <p className="mb-6">Minimalism isn't just about white walls and empty rooms. It's about intentionality. By consuming less, we reduce the demand for manufacturing and shipping, which are huge drivers of global emissions.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">The 300,000 Item Problem</h3>
                    <p className="mb-6">The average American home contains 300,000 items. Managing this inventory takes time, space, and money. Reducing this clutter leads to lower stress and a smaller carbon footprint. Every item you don't buy is an item that didn't need to be mined, manufactured, and shipped.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quality Over Quantity</h3>
                    <p className="mb-6">Minimalism encourages buying one high-quality item that lasts a lifetime rather than ten cheap ones that break annually. This "buy it for life" mentality dramatically reduces waste entering landfills.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Experiential Living</h3>
                    <p className="mb-6">Focus on experiences over possessions. Memories don't require warehouse space or shipping containers. A dinner with friends, a hike in the woods, or learning a new skill brings more lasting happiness than the dopamine hit of a new purchase.</p>

                    <p>Start small. Clear one drawer, one shelf, one room. The mental clarity you gain is just as valuable as the environmental impact you make.</p>
                </>
            )
        },
        {
            id: 6,
            category: "Tech",
            title: "The rise of carbon-aware computing.",
            excerpt: "How software engineers are writing code that runs when the grid is greenest.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
            content: (
                <>
                    <p className="mb-6">Carbon-aware computing represents a paradigm shift in software engineering. It's about intelligence: making software aware of the real-time state of the energy grid.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Temporal Shifting</h3>
                    <p className="mb-6">Running a backup job at 2 AM when wind power is high, rather than 6 PM when coal peaker plants are running. By delaying non-urgent tasks to green windows, we can reduce software emissions by 20-40% without changing a line of business logic.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Spatial Shifting</h3>
                    <p className="mb-6">If the wind isn't blowing in Texas, maybe the sun is shining in California. Cloud computing allows us to move workloads geographically to follow the cleanest energy availability.</p>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hardware Efficiency</h3>
                    <p className="mb-6">Extending the life of servers from 3 years to 5 years drastically reduces embodied carbon. Writing efficient code that runs on older hardware is a climate action.</p>

                    <p>Major tech companies are now building this intelligence directly into their data center operations. As developers, we have the power to "Green the Web" simply by being smarter about when and where our code runs.</p>
                </>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-carbon-dark text-gray-900 dark:text-white selection:bg-carbon-green selection:text-black font-sans animate-in fade-in duration-700 transition-colors duration-300">
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
                    <div className="hidden md:block font-bold text-xl tracking-tight text-gray-500">Blog</div>
                    <div className="w-24"></div>
                </div>
            </nav>

            <div className="pt-24 md:pt-32 pb-20 px-6 max-w-7xl mx-auto">

                {/* Featured Post */}
                <div className="relative rounded-[3rem] overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/10 mb-20 group cursor-pointer shadow-2xl dark:shadow-none transition-colors duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent z-10 transition-colors duration-300"></div>
                    {/* Hero Background using CSS Mesh Gradient */}
                    <div className="h-[500px] w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900 via-gray-900 to-black opacity-80 group-hover:scale-105 transition-transform duration-700">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8 md:p-20 z-20 max-w-3xl">
                        <span className="text-carbon-green font-bold uppercase tracking-wider mb-4 block">Featured Story</span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight group-hover:underline decoration-carbon-green underline-offset-8">
                            The hidden carbon cost of cloud computing (and how we solve it).
                        </h1>
                        <div className="flex items-center gap-4">
                            <img src={`${import.meta.env.BASE_URL}images/sri-avatar.jpg`} alt="Sri Villiam Sai" className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shadow-lg" />
                            <div>
                                <div className="font-bold text-lg">Sri Villiam Sai</div>
                                <div className="text-sm text-gray-300">Editor in Chief • Feb 2, 2026</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
                    {['Latest', 'Climate Science', 'Product Updates', 'Lifestyle', 'Engineering'].map(cat => (
                        <button key={cat} className="px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors whitespace-nowrap">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
                    {posts.map((post) => (
                        <div key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer">
                            <div className="h-64 bg-gray-50 dark:bg-carbon-gray rounded-3xl mb-6 overflow-hidden border border-gray-200 dark:border-white/5 relative shadow-lg dark:shadow-none transition-colors duration-300">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            <div className="text-sm text-carbon-green font-bold mb-2 uppercase tracking-wider">{post.category}</div>
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-tight">{post.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed transition-colors duration-300">{post.excerpt}</p>
                            <div className="text-sm text-gray-500">5 min read</div>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="bg-carbon-green/10 border border-carbon-green/20 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay in the loop.</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto transition-colors duration-300">Join 50,000+ subscribers learning how to live lightly on the land.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-lg mx-auto">
                            <input type="email" placeholder="Enter your email" className="flex-1 bg-white dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-carbon-green text-black dark:text-white transition-colors duration-300" />
                            <button className="bg-carbon-green text-black font-bold px-8 py-4 rounded-full hover:bg-[#2db54d] transition-colors">Subscribe</button>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-carbon-green/20 blur-[100px] rounded-full -z-0"></div>
                </div>

            </div>

            {/* Modal Popup for Post Content */}
            {selectedPost && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop with Blur */}
                    <div
                        className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl transition-all animate-in fade-in duration-300"
                        onClick={() => setSelectedPost(null)}
                    ></div>

                    {/* Modal Content */}
                    <div
                        className="relative bg-white dark:bg-carbon-gray border border-gray-200 dark:border-white/10 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 [&::-webkit-scrollbar]:hidden transition-colors duration-300"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full text-black dark:text-white transition-colors z-20"
                            onClick={() => setSelectedPost(null)}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="relative h-64 md:h-96 w-full">
                            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-carbon-gray dark:via-transparent dark:to-transparent transition-colors duration-300"></div>
                            <div className="absolute bottom-6 left-6 md:left-12">
                                <span className="bg-carbon-green text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                                    {selectedPost.category}
                                </span>
                                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight max-w-2xl shadow-black drop-shadow-lg transition-colors duration-300">
                                    {selectedPost.title}
                                </h2>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 text-gray-600 dark:text-gray-300 leading-8 text-lg transition-colors duration-300">
                            {selectedPost.content}

                            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-white/5 flex items-center justify-between transition-colors duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                                    <div className="text-sm">
                                        <div className="text-gray-900 dark:text-white font-bold">Carbon Team</div>
                                        <div className="text-gray-500">Written by AI</div>
                                    </div>
                                </div>
                                <button className="text-carbon-green font-bold hover:underline">
                                    Share this article
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Blog;
