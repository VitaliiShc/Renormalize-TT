'use client';

import Image from 'next/image';
import { SortLink } from '@/app/(admin)/orders/components/SortLink';

type TableHeaderProps = {
  sort: string | null;
  order: string | null;
  onSort: (sortBy: string) => { sort: string | null; order: string | null };
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

export const TableHeader = ({ sort, order, onSort }: TableHeaderProps) => {
  const setSortIcon = (key: string) => {
    let iconSrc = '/icons/caret-sort.svg';

    switch (true) {
      case sort === key && !order:
        iconSrc = '/icons/caret-up.svg';
        break;
      case sort === key && !!order:
        iconSrc = '/icons/caret-down.svg';
        break;
    }

    return <Image src={iconSrc} width={16} height={16} alt="sort" />;
  };

  return (
    <thead>
      <tr>
        {headers.map((header) => {
          const isSortable = header.sortable;
          const key = header.label.toLowerCase();

          return (
            <th
              key={header.label}
              className="py-4 text-sm font-bold w-1/8 pr-4 first:justify-center last:justify-center"
            >
              <div className="flex justify-between">
                <p>{header.label}</p>
                <p>
                  {isSortable && (
                    <SortLink params={onSort(key)}>{setSortIcon(key)}</SortLink>
                  )}
                </p>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
