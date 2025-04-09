import { useOrders } from '@/contexts/OrdersContext';
import { useTableParams } from './useTableParams';
import { filterAndSortOrders } from '@/lib/filterAndSortOrders';

export const useFilteredOrders = () => {
  const { orders } = useOrders();
  const { query, sort, order } = useTableParams();

  return filterAndSortOrders({
    orders,
    query,
    sortered: sort,
    ordered: order,
  });
};
