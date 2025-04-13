'use client';

import { useSearchParams, useRouter } from 'next/navigation';

type TableParams = {
  page: number;
  limit: number;
  sort: string | null;
  query: string | null;
  reverse: boolean;
};

type SetTableParams = Partial<TableParams>;

export const useTableParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParam = (key: string, fallback: string) => {
    return searchParams.get(key) ?? fallback;
  };

  const parseSafeInt = (value: string, fallback: number) => {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const currentPage = parseSafeInt(getParam('page', '1'), 1);
  const limit = parseSafeInt(getParam('limit', '10'), 10);
  const sort = searchParams.get('sort');
  const query = searchParams.get('query');
  const reverse = searchParams.get('reverse') === 'true';

  const setParams = (params: SetTableParams) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    console.log('[setParams] router.push with:', newParams.toString());
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const setSorting = (
    sortKey: string
  ): { sort: string | null; reverse: boolean } => {
    switch (true) {
      case !sort || sort !== sortKey:
        return { sort: sortKey, reverse: false };

      case sort === sortKey && !reverse:
        return { sort: sortKey, reverse: true };

      default:
        return { sort: null, reverse: false };
    }
  };

  console.log('[useTableParams] searchParams:', searchParams.toString());
  console.log('[useTableParams] currentPage:', currentPage);

  return {
    currentPage,
    limit,
    sort,
    reverse,
    query,
    setParams,
    setSorting,
  };
};
