import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                return 'dark';
            }
            return 'light';
        }
        return 'dark'; // Fallback
    });

    useEffect(() => {
        // Class and Style Synchronization
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    }, [theme]);

    // Dynamic Meta Tag Update
    useEffect(() => {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
        }

        const appleStatusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (appleStatusMeta) {
            appleStatusMeta.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
        }
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            setTheme('dark');
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        }
    };

    return { theme, toggleTheme };
};
