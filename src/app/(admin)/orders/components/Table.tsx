/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Fragment, useEffect } from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { useTableParams } from '@/hooks/useTableParams';
import { useFilteredOrders } from '@/hooks/useFilteredOrders';
import { StateMessage } from '@/components/StateMessage';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

export const Table = () => {
  const { isLoading, isError } = useOrders();
  const { currentPage, limit, sort, reverse, query, setParams, setSorting } =
    useTableParams();
  const filteredOrders = useFilteredOrders();

  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const paginatedOrders = filteredOrders.slice(start, end);

  useEffect(() => {
    const lastPage = Math.max(1, Math.ceil(filteredOrders.length / limit));

    if (filteredOrders.length > 0 && currentPage > lastPage) {
      setParams({ page: lastPage });
    }
  }, [filteredOrders.length, currentPage, limit]);

  useEffect(() => {
    const searchPage = new URLSearchParams(window.location.search).get('page');
    if (!searchPage) {
      setParams({ page: 1 });
    }
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
          <TableHeader sort={sort} reverse={reverse} onSort={setSorting} />
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
