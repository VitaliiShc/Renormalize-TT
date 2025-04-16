'use client';

import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialQuery = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(initialQuery);

  const updateQuery = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateQuery(term);
  }, 300);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleSearch(newValue);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch.cancel();
      updateQuery(inputValue);
    }
  };

  return (
    <div className="relative w-55 h-8">
      <Image
        src="/icons/search.svg"
        alt="search"
        width={16}
        height={16}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search..."
        className="border border-[#9e9e9e] h-full w-full pl-8 pr-2 rounded-lg text-xs focus:outline-none"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
