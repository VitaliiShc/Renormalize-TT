'use client';

import { useTableParams } from '@/hooks/useTableParams';
import { useFilteredOrders } from '@/hooks/useFilteredOrders';
import { usePaginationLogic } from '@/hooks/usePaginationLogic';
import { PaginationStepButton } from './PaginationStepButton';
import { PaginationPageButton } from './PaginationPageButton';
import { PaginationEllipsis } from './ui/PaginationEllipsis';

export const Pagination = () => {
  const filteredOrders = useFilteredOrders();
  const { currentPage, limit, setParams } = useTableParams();
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / limit));

  const { goToPage, generatePages } = usePaginationLogic({
    currentPage,
    totalPages,
    setParams,
  });

  const displayedPages = generatePages();

  return (
    <div className="flex justify-center items-center gap-2 p-4 flex-wrap text-sm">
      <PaginationStepButton
        direction="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div className="flex gap-1">
        {displayedPages.map((page, idx) =>
          typeof page === 'number' ? (
            <PaginationPageButton
              key={idx}
              page={page}
              currentPage={currentPage}
              goToPage={goToPage}
            />
          ) : (
            <PaginationEllipsis key={`ellipsis-${idx}`} />
          )
        )}
      </div>

      <PaginationStepButton
        direction="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
