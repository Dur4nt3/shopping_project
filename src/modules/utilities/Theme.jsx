import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const Theme = createContext('light');

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    };

    return (
        <Theme.Provider value={{ theme, toggleTheme }}>
            {children}
        </Theme.Provider>
    );
}
