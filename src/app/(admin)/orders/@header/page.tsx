'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/app/components/Header';

export default function PageHeader() {
  const { toggleTheme } = useTheme();

  return <Header toggleTheme={toggleTheme}>Orders</Header>;
}
