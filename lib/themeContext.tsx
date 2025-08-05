import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#6200EE',
  card: '#FFFFFF',
  border: '#CCCCCC',
  secondary: '#F5F5F5',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
};

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#BB86FC',
  card: '#1E1E1E',
  border: '#333333',
  secondary: '#2D2D2D',
  success: '#81C784',
  warning: '#FFB74D',
  error: '#E57373',
};

const ThemeContext = createContext({
  theme: lightTheme,
  themeMode: 'system' as ThemeMode,
  setThemeMode: (mode: ThemeMode) => {},
  isDarkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [systemColorScheme, setSystemColorScheme] = useState<'light' | 'dark' | null>(null);

  // Load saved theme mode from storage
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem('themeMode');
        if (savedThemeMode && ['light', 'dark', 'system'].includes(savedThemeMode)) {
          setThemeModeState(savedThemeMode as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme mode:', error);
      }
    };
    loadThemeMode();
  }, []);

  // Listen to system color scheme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme || 'light');
    });
    
    // Set initial system color scheme
    const initialColorScheme = Appearance.getColorScheme();
    setSystemColorScheme(initialColorScheme || 'light');
    
    return () => subscription?.remove();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  // Determine if dark mode should be active
  const isDarkMode = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
