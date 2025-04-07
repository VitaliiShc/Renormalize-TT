'use client';

import React, { ChangeEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialQuery = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleSearch(newValue);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="border px-2 py-1 rounded"
      value={inputValue}
      onChange={onChange}
    />
  );
};
