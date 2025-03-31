import React, { createContext, useState, useContext } from 'react';

// Create a context to manage the theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component to wrap your app
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
