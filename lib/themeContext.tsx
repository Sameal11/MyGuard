import React, { createContext, useContext, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#6200EE',
  card: '#FFFFFF',
  border: '#CCCCCC',
};

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#BB86FC',
  card: '#1E1E1E',
  border: '#333333',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
