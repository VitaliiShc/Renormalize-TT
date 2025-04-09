import { useQuery } from '@tanstack/react-query';
import { Order, OrderStatus } from '@/types/types';

type RawOrder = Omit<Order, 'Status'> & { Status: string };

const ORDERS_KEY = ['orders'];

const parseOrders = (raw: RawOrder[]): Order[] =>
  raw.map((item) => ({
    ...item,
    Status: item.Status as OrderStatus,
  }));

export const loadOrders = async (): Promise<Order[]> => {
  const saved = localStorage.getItem('orders');

  if (saved) {
    const parsed: RawOrder[] = JSON.parse(saved);

    return parseOrders(parsed);
  }

  const res = await fetch('/dataset/sample_dataset_final_update.json');
  const data: RawOrder[] = await res.json();
  const casted = parseOrders(data);

  localStorage.setItem('orders', JSON.stringify(casted));

  return casted;
};

export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ORDERS_KEY,
    queryFn: loadOrders,
    staleTime: Infinity,
  });
};
