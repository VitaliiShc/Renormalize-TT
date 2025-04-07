import React from 'react';
import './globals.css';
import { OrdersProvider } from '@/context/OrdersContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OrdersProvider>{children}</OrdersProvider>
      </body>
    </html>
  );
}
