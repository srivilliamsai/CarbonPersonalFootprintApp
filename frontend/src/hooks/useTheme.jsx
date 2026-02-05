import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                return 'dark';
            }
            return 'light';
        }
        return 'light'; // Default to Light to match HTML
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

    // Dynamic Meta Tag Update - Remove and re-add for Safari compatibility
    useEffect(() => {
        const newColor = theme === 'dark' ? '#000000' : '#ffffff';
        const newStatusStyle = theme === 'dark' ? 'black' : 'default';

        // Remove existing theme-color meta tag and add a new one
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (themeColorMeta) {
            themeColorMeta.remove();
        }
        themeColorMeta = document.createElement('meta');
        themeColorMeta.name = 'theme-color';
        themeColorMeta.content = newColor;
        document.head.appendChild(themeColorMeta);

        // Remove existing apple-mobile-web-app-status-bar-style and add a new one
        let appleStatusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (appleStatusMeta) {
            appleStatusMeta.remove();
        }
        appleStatusMeta = document.createElement('meta');
        appleStatusMeta.name = 'apple-mobile-web-app-status-bar-style';
        appleStatusMeta.content = newStatusStyle;
        document.head.appendChild(appleStatusMeta);
    }, [theme]);

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            localStorage.theme = 'light';
        } else {
            setTheme('dark');
            localStorage.theme = 'dark';
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
