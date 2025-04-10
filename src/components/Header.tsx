'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { usePathname } from 'next/navigation';
import { makeStringCapitalize } from '@/lib/makeStringCapitalize';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const currentPage = pathname.split('/').pop();

  return (
    <header className="flex items-center py-2.5 px-5 border-b border-gray-300">
      <Link href="/" className="w-6 h-6 mr-5">
        <Image
          src={
            theme === 'dark'
              ? '/icons/angle-left-white.svg'
              : '/icons/angle-left-black.svg'
          }
          width={24}
          height={24}
          alt="Yankee go home"
        />
      </Link>
      <h1 className="flex-1 text-xl font-bold ">
        {makeStringCapitalize(currentPage || '')}
      </h1>

      <button className="btn cursor-pointer" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </header>
  );
};
