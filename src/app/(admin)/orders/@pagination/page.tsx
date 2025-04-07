'use client';

import React, { Suspense } from 'react';
import clsx from 'clsx';
import { useTableParams } from '@/hooks/useTableParams';

export default function OrdersPagination({ total }: { total: number }) {
  const { page, limit, setParams } = useTableParams();

  const currentPage = Number.isNaN(page) ? 1 : page;
  const currentLimit = Number.isNaN(limit) ? 10 : limit;
  const totalPages = Math.ceil(total / currentLimit);
  const validTotalPages = Number.isNaN(totalPages) ? 1 : totalPages;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= validTotalPages && newPage !== currentPage) {
      setParams({ page: newPage });
      scrollToTop();
    }
  };

  if (validTotalPages <= 1) {
    return null;
  }

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (validTotalPages <= 7) {
      for (let i = 1; i <= validTotalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(validTotalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < validTotalPages - 3) {
        pages.push('...');
      }

      pages.push(validTotalPages);
    }

    return pages;
  };

  const displayedPages = generatePages();

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                )}
                onClick={() => goToPage(page)}
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
          disabled={currentPage === validTotalPages}
        >
          Next
        </button>
      </div>
    </Suspense>
  );
}
