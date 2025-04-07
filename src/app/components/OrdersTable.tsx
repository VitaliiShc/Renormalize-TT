/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useOrders } from '@/context/OrdersContext';
import { filterAndSortOrders } from '@/utils/filterAndSortOrders';
import { useTableParams } from '@/utils/useTableParams';
import { OrdersTableRow } from '@/app/components/OrdersTableRow';
import { SearchLink } from '@/app/components/SearchLink';
import OrdersPagination from '@/app/(admin)/orders/@pagination/page';

const headers = [
  { label: 'Tracking ID', sortable: false },
  { label: 'Product', sortable: true },
  { label: 'Customer', sortable: true },
  { label: 'Date', sortable: true },
  { label: 'Amount', sortable: false },
  { label: 'Payment Mode', sortable: false },
  { label: 'Status', sortable: true },
  { label: 'Actions', sortable: false },
];

export function OrdersTable() {
  const { orders } = useOrders();
  const searchParams = useSearchParams();
  const { page, limit, setParams } = useTableParams();

  const sortered = searchParams.get('sort') || null;
  const query = searchParams.get('query') || null;
  const orderedParam = searchParams.get('order');
  const ordered =
    orderedParam === 'asc' || orderedParam === 'desc' ? orderedParam : null;

  const setSorting = (sortBy: string) => {
    switch (true) {
      case !sortered && !ordered:
      case sortered !== sortBy:
        return { sort: sortBy, order: null };
      case sortered === sortBy && !ordered:
        return { sort: sortBy, order: 'desc' };
      case sortered === sortBy && !!ordered:
      default:
        return { sort: null, order: null };
    }
  };

  const setSortIcon = (value: string) => {
    let iconSrc = '/icons/caret-sort.svg';

    switch (true) {
      case sortered === value && !ordered:
        iconSrc = '/icons/caret-up.svg';
        break;
      case sortered === value && !!ordered:
        iconSrc = '/icons/caret-down.svg';
        break;
      default:
        iconSrc = '/icons/caret-sort.svg';
        break;
    }

    return <Image src={iconSrc} width={16} height={16} alt="sortered" />;
  };

  const listOfOrders = filterAndSortOrders({
    orders,
    query,
    sortered,
    ordered,
  });

  useEffect(() => {
    if (page > 1 && (page - 1) * limit >= listOfOrders.length) {
      const lastPage = Math.ceil(listOfOrders.length / limit);
      setParams({ page: lastPage });
    }
  }, [listOfOrders.length, page, limit]);

  useEffect(() => {
    setParams({ page: 1 });
  }, [query]);

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedOrders = listOfOrders.slice(start, end);

  if (!orders.length) return <p>Loading...</p>;

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            {headers.map((header) => {
              const isSortable = header.sortable;
              return (
                <th
                  key={header.label}
                  className="py-4 text-sm font-bold w-1/8 pr-4 first:justify-center last:justify-center"
                >
                  <div className="flex justify-between">
                    <p>{header.label}</p>
                    <p>
                      {isSortable && (
                        <SearchLink
                          params={setSorting(header.label.toLowerCase())}
                        >
                          {setSortIcon(header.label.toLowerCase())}
                        </SearchLink>
                      )}
                    </p>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <Fragment key={order['Tracking ID']}>
              <OrdersTableRow order={order} />
            </Fragment>
          ))}
        </tbody>
      </table>

      <OrdersPagination total={listOfOrders.length} />
    </>
  );
}
