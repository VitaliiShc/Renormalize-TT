import { Order } from '@/types/types';

type FilterAndSortOrdersProps = {
  orders: Order[];
  query: string | null;
  sortered: string | null;
  reversed: boolean;
};

const fieldMap: Record<string, keyof Order> = {
  product: 'Product Name',
  customer: 'Customer',
  date: 'Date',
  status: 'Status',
};

export const filterAndSortOrders = ({
  orders,
  query,
  sortered,
  reversed,
}: FilterAndSortOrdersProps) => {
  const filteredOrders = orders.filter((order) =>
    !query
      ? true
      : order['Product Name'].toLowerCase().includes(query.trim().toLowerCase())
  );

  const field = sortered ? fieldMap[sortered] : null;

  if (field) {
    const sorted = [...filteredOrders].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (!aValue || !bValue) {
        return 0;
      }

      const result = aValue.toString().localeCompare(bValue.toString());

      return reversed ? -result : result;
    });

    return sorted;
  }

  return filteredOrders;
};
