'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Order, OrderStatus } from '@/app/types/types';

interface OrdersContextValue {
  orders: Order[];
  deleteOrder: (trackingId: number) => void;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

type RawOrder = Omit<Order, 'Status'> & { Status: string };

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('orders');

    if (saved) {
      try {
        const parsed: RawOrder[] = JSON.parse(saved);

        const castedOrders: Order[] = parsed.map((item) => ({
          ...item,
          Status: item.Status as OrderStatus,
        }));

        setOrders(castedOrders);
      } catch (err) {
        console.error('Error parsing localStorage data:', err);
      }
    } else {
      fetch('/dataset/sample_dataset_final_update.json')
        .then((res) => res.json())
        .then((data: RawOrder[]) => {
          const castedOrders: Order[] = data.map((item) => ({
            ...item,
            Status: item.Status as OrderStatus,
          }));

          localStorage.setItem('orders', JSON.stringify(castedOrders));
          setOrders(castedOrders);
        })
        .catch((err) => {
          console.error('Error loading orders:', err);
        });
    }
  }, []);

  const deleteOrder = (trackingId: number) => {
    const updated = orders.filter(
      (order) => order['Tracking ID'] !== trackingId
    );
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <OrdersContext.Provider value={{ orders, deleteOrder }}>
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
