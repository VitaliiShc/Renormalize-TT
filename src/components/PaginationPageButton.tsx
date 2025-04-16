'use client';

import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types/types';

type PaginationPageButtonProps = {
  page: number;
  currentPage: number;
  goToPage: (page: number) => void;
};

export const PaginationPageButton = ({
  page,
  currentPage,
  goToPage,
}: PaginationPageButtonProps) => {
  const { theme } = useTheme();
  const isCurrentPage = page === currentPage;
  const isDarkTheme = theme === Theme.Dark;

  const baseClasses = 'w-7.75 h-7.75 rounded-md text-xs';
  const activeClasses = 'bg-[#624de3] text-white';
  const inactiveBg = isDarkTheme ? 'bg-[#141432]' : 'bg-[#e0e0e0]';
  const inactiveText = isDarkTheme ? 'text-white' : 'text-black';
  const inactiveHover = 'hover:bg-[#4338ca] hover:text-white cursor-pointer';

  const buttonClasses = clsx(
    baseClasses,
    isCurrentPage ? activeClasses : [inactiveBg, inactiveText, inactiveHover]
  );

  return (
    <button
      className={buttonClasses}
      onClick={() => goToPage(page)}
      disabled={isCurrentPage}
    >
      {page}
    </button>
  );
};
