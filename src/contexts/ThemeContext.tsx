'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '@/types/types';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (!savedTheme) {
      localStorage.setItem('theme', Theme.Light);
    } else {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.add(theme);

    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  return <>{children}</>;
};
