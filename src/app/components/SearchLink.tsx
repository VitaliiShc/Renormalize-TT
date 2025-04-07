'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { getSearchWith, SearchParams } from '@/utils/searchHelper';

type Props = {
  params: SearchParams;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SearchLink: React.FC<Props> = ({ children, params, ...props }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = getSearchWith(searchParams, params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Link href={`${pathname}?${search}`} {...props}>
        {children}
      </Link>
    </Suspense>
  );
};
