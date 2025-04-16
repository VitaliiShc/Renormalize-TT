'use client';

import clsx from 'clsx';
import { SortLink } from '@/components/SortLink';
import { SortIcon } from '@/components/ui/SortIcon';
import { SearchParams } from '@/lib/searchHelper';

type TableHeaderProps = {
  sort: string | null;
  reverse: boolean;
  onSort: (sortKey: string) => SearchParams;
};

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

export const TableHeader = ({ sort, reverse, onSort }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => {
          const isSortable = header.sortable;
          const key = header.label.toLowerCase();

          return (
            <th
              key={header.label}
              className={clsx(
                'py-4 text-sm font-bold px-2',
                !['Tracking ID', 'Actions'].includes(header.label) &&
                  'text-left'
              )}
            >
              {isSortable ? (
                <SortLink params={onSort(key)}>
                  <p>{header.label}</p>
                  <SortIcon sort={sort} reverse={reverse} column={key} />
                </SortLink>
              ) : (
                <p>{header.label}</p>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
