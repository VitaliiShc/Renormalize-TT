'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useTableParams } from '@/utils/useTableParams';
import { SearchInput } from '@/app/components/SearchInput';

export default function OrdersToolbar() {
  const { theme } = useTheme();
  const { limit, setParams } = useTableParams();

  return (
    <div className="flex justify-between py-4">
      <div className="flex justify-between items-center gap-4 text-xs">
        <label className="flex items-center gap-3">
          Show
          <div className="relative w-[42px] h-[31px]">
            <select
              value={limit}
              onChange={(e) => setParams({ limit: +e.target.value, page: 1 })}
              className={clsx(
                'appearance-none h-full pr-5 pl-2 rounded-lg outline-none',
                theme === 'dark' && 'bg-[#141432]',
                theme === 'light' && 'bg-[#e0e0e0]'
              )}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>

            <Image
              src={
                theme === 'dark'
                  ? '/icons/caret-down-white.svg'
                  : '/icons/caret-down.svg'
              }
              alt="Arrow"
              width={12}
              height={12}
              className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2"
            />
          </div>
          entries
        </label>

        <SearchInput />
      </div>
      <button className="btn-primary ml-4">Add Customer</button>
    </div>
  );
}
