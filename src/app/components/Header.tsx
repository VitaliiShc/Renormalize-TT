import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export interface HeaderProps {
  children: React.ReactNode;
  toggleTheme: () => void;
}

export default function Header({ children, toggleTheme }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <header className="flex items-center py-2.5 px-5 border-b border-gray-300">
      <Link href="/" className="mr-5">
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
      <h1 className="flex-1 text-xl font-bold ">{children}</h1>

      <button className="btn cursor-pointer" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </header>
  );
}
