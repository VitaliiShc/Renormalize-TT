'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useTableParams } from '@/hooks/useTableParams';
import { SearchInput } from '@/components/SearchInput';
import { Theme } from '@/types/types';
import Button from '@/components/Button';

export const Toolbar = () => {
  const { theme } = useTheme();
  const { limit, setParams } = useTableParams();
  const isDarkTheme = theme === Theme.Dark;

  return (
    <section className="flex justify-between py-4">
      <div className="flex justify-between items-center gap-6 text-xs">
        <label className="flex items-center gap-3">
          Show
          <div className="relative w-[42px] h-[31px]">
            <select
              value={limit}
              onChange={(evt) =>
                setParams({ limit: +evt.target.value, page: 1 })
              }
              className={clsx(
                'appearance-none h-full pr-5 pl-2 rounded-lg outline-none cursor-pointer',
                isDarkTheme ? 'bg-[#141432]' : 'bg-[#e0e0e0]'
              )}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>

            <Image
              src={
                isDarkTheme
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
      <Button>
        <Image src="/icons/plus.svg" alt="add" width={20} height={20} />
        Add Customer
      </Button>
    </section>
  );
};
