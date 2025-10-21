import { createContext, useState, useEffect } from 'react';

// const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// eslint-disable-next-line react-refresh/only-export-components
export const Theme = createContext('light');

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    // useEffect(() => {
    //     if (theme === 'dark') {
    //         if (!document.body.classList.contains('dark-mode')) {
    //             document.body.classList.add('dark-mode');
    //         }
    //     }
    // }, [theme]);

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return (
        <Theme.Provider value={{ theme, toggleTheme }}>
            {children}
        </Theme.Provider>
    );
}
