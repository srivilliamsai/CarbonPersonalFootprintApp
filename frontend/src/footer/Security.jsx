import React from 'react';
import Footer from '../Footer';

const Security = ({ onNavigate }) => {
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
                        <span className="relative z-10 flex flex-col items-start md:flex-row md:items-center md:gap-1 leading-none md:leading-normal">
                            <span>Carbon</span>
                            <span>Personal Footprint</span>
                        </span>
                    </div>
                    <div className="font-bold text-sm md:text-xl tracking-tight text-gray-500">Security</div>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">Security</h1>
                <p className="text-gray-500 mb-10">Your data safety is our top priority.</p>

                <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Encryption</h2>
                        <p>All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.3. Data at rest is encrypted using AES-256.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">Access Control</h2>
                        <p>We use strict access control policies to ensure that only authorized personnel have access to production systems. All access is logged and audited.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">Third-Party Audits</h2>
                        <p>We regularly undergo independent security audits and penetration testing to identify and address potential vulnerabilities.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-2">Responsible Disclosure</h2>
                        <p>If you believe you have found a security vulnerability in our application, please report it to security@carbonapp.com.</p>
                    </section>
                </div>
            </div>
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

export default Security;
