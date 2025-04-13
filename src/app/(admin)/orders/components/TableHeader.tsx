'use client';

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
              className="py-4 text-sm font-bold w-1/8 pr-4 first:justify-center last:justify-center"
            >
              <div className="flex justify-between">
                <p>{header.label}</p>
                <p>
                  {isSortable && (
                    <SortLink params={onSort(key)}>
                      <SortIcon sort={sort} reverse={reverse} column={key} />
                    </SortLink>
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
