'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export function useTableParams() {
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

  const setParams = (params: Partial<{ page: number; limit: number }>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        newParams.set(key, String(value));
      }
    });

    router.push(`?${newParams.toString()}`);
  };

  return {
    page,
    limit,
    setParams,
  };
}
