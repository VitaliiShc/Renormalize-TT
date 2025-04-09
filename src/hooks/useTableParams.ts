'use client';

import { useSearchParams, useRouter } from 'next/navigation';

type TableParams = {
  page: number;
  limit: number;
  sort: string | null;
  order: 'asc' | 'desc' | null;
  query: string | null;
};

type SettableParams = Partial<
  Omit<TableParams, 'order'> & { order: 'asc' | 'desc' | null }
>;

export const useTableParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParam = (key: string, fallback: string) =>
    searchParams.get(key) ?? fallback;

  const parseSafeInt = (value: string, fallback: number) => {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const page = parseSafeInt(getParam('page', '1'), 1);
  const limit = parseSafeInt(getParam('limit', '10'), 10);
  const sort = searchParams.get('sort');
  const query = searchParams.get('query');
  const orderRaw = searchParams.get('order');
  const order: 'asc' | 'desc' | null =
    orderRaw === 'asc' || orderRaw === 'desc' ? orderRaw : null;

  const setParams = (params: SettableParams) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (value !== undefined) {
        newParams.set(key, String(value));
      }
    });

    router.push(`?${newParams.toString()}`);
  };

  return {
    page,
    limit,
    sort,
    order,
    query,
    setParams,
  };
};
