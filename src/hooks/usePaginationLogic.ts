import { useCallback } from 'react';

type UsePaginationLogicProps = {
  currentPage: number;
  totalPages: number;
  setParams: (params: { page: number }) => void;
  middleCount?: number;
};

export const usePaginationLogic = ({
  currentPage,
  totalPages,
  setParams,
  middleCount = 5,
}: UsePaginationLogicProps) => {
  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
        setParams({ page: newPage });
      }
    },
    [currentPage, totalPages, setParams]
  );

  const generatePages = useCallback((): (number | string)[] => {
    if (totalPages <= middleCount + 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    pages.push(1);

    const half = Math.floor(middleCount / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 2) {
      end += 2 - start;
      start = 2;
    }

    if (end > totalPages - 1) {
      start -= end - (totalPages - 1);
      end = totalPages - 1;
    }

    if (start > 2) {
      pages.push('...');
    }

    for (let i = Math.max(2, start); i <= Math.min(end, totalPages - 1); i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages, middleCount]);

  return {
    goToPage,
    generatePages,
  };
};
