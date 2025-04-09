'use client';

import clsx from 'clsx';
import { useTableParams } from '@/hooks/useTableParams';
import { useFilteredOrders } from '@/hooks/useFilteredOrders';

export const Pagination = () => {
  const filteredOrders = useFilteredOrders();
  const { page, limit, setParams } = useTableParams();
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / limit));
  const currentPage = Number.isNaN(page) ? 1 : page;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setParams({ page: newPage });
      scrollToTop();
    }
  };

  const generatePages = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    if (currentPage > 4) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const displayedPages = generatePages();

  return (
    <div className="flex justify-center items-center gap-2 p-4 flex-wrap text-sm">
      <button
        className="btn"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className="flex gap-1">
        {displayedPages.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={idx}
              className={clsx(
                'px-3 py-1 rounded-md border',
                page === currentPage
                  ? 'bg-primary text-white border-primary cursor-default'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              )}
              onClick={() => goToPage(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="px-2 py-1 text-gray-500 select-none">
              {page}
            </span>
          )
        )}
      </div>

      <button
        className="btn"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
