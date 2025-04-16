'use client';

import { createContext, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Order } from '@/types/types';
import { useOrdersQuery } from '@/hooks/useOrdersQuery';

type OrdersContextValue = {
  orders: Order[];
  deleteOrder: (trackingId: number) => void;
  isLoading: boolean;
  isError: boolean;
};

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: orders = [], isLoading, isError } = useOrdersQuery();

  const deleteOrder = (trackingId: number) => {
    const updated = orders.filter(
      (order) => order['Tracking ID'] !== trackingId
    );
    localStorage.setItem('orders', JSON.stringify(updated));
    queryClient.setQueryData(['orders'], updated);
  };

  return (
    <OrdersContext.Provider value={{ orders, deleteOrder, isLoading, isError }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};
