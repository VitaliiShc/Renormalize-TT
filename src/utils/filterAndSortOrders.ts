import { Order } from '@/app/types/types';

type filterAndSortOrdersProps = {
  orders: Order[];
  query: string | null;
  sortered: string | null;
  ordered: 'asc' | 'desc' | null;
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
  ordered,
}: filterAndSortOrdersProps) => {
  const filteredSortedOrders = orders.filter((order) =>
    !query
      ? true
      : order['Product Name'].toLowerCase().includes(query.trim().toLowerCase())
  );

  const field = sortered ? fieldMap[sortered] : null;

  if (field) {
    const sorted = [...filteredSortedOrders].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (!aValue || !bValue) {
        return 0;
      }

      const result = aValue.toString().localeCompare(bValue.toString());

      return ordered === 'desc' ? -result : result;
    });

    return sorted;
  }

  return filteredSortedOrders;
};
