import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * Determines theme based on time of day:
 * 6:00 AM - 5:59 PM → light
 * 6:00 PM - 5:59 AM → dark
 */
function getTimeBasedTheme() {
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
    // Session-only state: defaults to time-based theme, no localStorage
    const [theme, setTheme] = useState(() => getTimeBasedTheme());
    // Track whether user manually toggled (session-only flag)
    const [userOverride, setUserOverride] = useState(false);

    // Apply theme class to <html>
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    // Auto-update theme at 6AM and 6PM if user hasn't manually toggled
    useEffect(() => {
        if (userOverride) return; // User took control, don't auto-switch

        const checkTime = () => {
            const newTheme = getTimeBasedTheme();
            setTheme(prev => (prev !== newTheme ? newTheme : prev));
        };

        // Check every minute
        const interval = setInterval(checkTime, 60 * 1000);
        return () => clearInterval(interval);
    }, [userOverride]);

    const toggleTheme = () => {
        setUserOverride(true); // Mark as manually overridden for this session
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
