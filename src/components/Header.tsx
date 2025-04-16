'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';
import { makeStringCapitalize } from '@/utils/makeStringCapitalize';
import { Theme } from '@/types/types';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const tableName = pathname.split('/').pop();

  return (
    <header className="flex items-center py-2.5 px-4 border-b border-gray-300 -mx-4">
      <Link href="/" className="w-5 h-6 mr-3 flex justify-center items-center">
        <Image
          src={
            theme === Theme.Dark
              ? '/icons/angle-left-white.svg'
              : '/icons/angle-left-black.svg'
          }
          width={20}
          height={20}
          alt="Yankee go home"
        />
      </Link>
      <h1 className="flex-1 text-xl font-bold ">
        {makeStringCapitalize(tableName || '')}
      </h1>

      <button className="cursor-pointer" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </header>
  );
};
