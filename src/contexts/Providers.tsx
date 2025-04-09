'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OrdersProvider } from '@/contexts/OrdersContext';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
