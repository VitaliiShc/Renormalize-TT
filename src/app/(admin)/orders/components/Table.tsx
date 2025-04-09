/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Fragment, useEffect } from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { useTableParams } from '@/hooks/useTableParams';
import { useFilteredOrders } from '@/hooks/useFilteredOrders';
import { StateMessage } from '@/components/StateMessage';
import { TableHeader } from './TableHeader';
import { TableRow } from '@/app/(admin)/orders/components/TableRow';

export const Table = () => {
  const { isLoading, isError } = useOrders();
  const { page, limit, sort, order, query, setParams } = useTableParams();
  const filteredOrders = useFilteredOrders();

  const setSorting = (sortBy: string) => {
    switch (true) {
      case !sort && !order:
      case sort !== sortBy:
        return { sort: sortBy, order: null };
      case sort === sortBy && !order:
        return { sort: sortBy, order: 'desc' };
      case sort === sortBy && !!order:
      default:
        return { sort: null, order: null };
    }
  };

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedOrders = filteredOrders.slice(start, end);

  useEffect(() => {
    if (page > 1 && (page - 1) * limit >= filteredOrders.length) {
      const lastPage = Math.max(1, Math.ceil(filteredOrders.length / limit));
      setParams({ page: lastPage });
    }
  }, [filteredOrders.length, page, limit]);

  useEffect(() => {
    setParams({ page: 1 });
  }, [query]);

  return (
    <>
      {isLoading && <StateMessage message="Loading orders..." />}
      {isError && <StateMessage message="Error loading orders" />}
      {!isLoading && !isError && filteredOrders.length === 0 && (
        <StateMessage message="No records found" />
      )}

      {!isLoading && !isError && filteredOrders.length > 0 && (
        <table className="min-w-full">
          <TableHeader sort={sort} order={order} onSort={setSorting} />

          <tbody>
            {paginatedOrders.map((order) => (
              <Fragment key={order['Tracking ID']}>
                <TableRow order={order} />
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
