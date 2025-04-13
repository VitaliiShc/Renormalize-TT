'use client';

import clsx from 'clsx';

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
  const isCurrentPage = page === currentPage;

  return (
    <button
      className={clsx(
        'px-3 py-1 rounded-md border',
        isCurrentPage
          ? 'bg-primary text-white border-primary'
          : 'bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer'
      )}
      onClick={() => goToPage(page)}
      disabled={isCurrentPage}
    >
      {page}
    </button>
  );
};
