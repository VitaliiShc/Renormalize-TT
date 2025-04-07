import React from 'react';
import { ThemeWrapper } from '@/app/components/ThemeWrapper';
import { ThemeProvider } from '@/context/ThemeContext';

export interface LayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  toolbar: React.ReactNode;
  pagination: React.ReactNode;
}

export default function Layout({
  children,
  header,
  toolbar,
  pagination,
}: LayoutProps) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        {header}
        <main className="p-4 space-y-4">
          {toolbar}
          {children}
          {pagination}
        </main>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
