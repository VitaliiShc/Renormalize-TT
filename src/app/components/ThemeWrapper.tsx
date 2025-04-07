'use client';

import React, { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.add(theme);

    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  return <>{children}</>;
}
