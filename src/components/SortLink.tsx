'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { getSearchWith, SearchParams } from '@/lib/searchHelper';

type SortLinkProps = {
  params: SearchParams;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const SortLink: React.FC<SortLinkProps> = ({
  children,
  params,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = getSearchWith(searchParams, params);

  return (
    <Link
      href={`${pathname}?${search}`}
      {...rest}
      className="flex justify-between"
    >
      {children}
    </Link>
  );
};
