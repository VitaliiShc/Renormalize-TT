'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export const ScrollToTopButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        'fixed bottom-6 right-6 z-50 h-10 w-10 rounded-full bg-[#624de3] transition-opacity duration-300 hover:bg-[#4338ca] cursor-pointer flex justify-center items-center',
        isAtTop ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
    >
      <Image
        src={'/icons/angle-up.svg'}
        width={20}
        height={20}
        alt="Scroll to top"
      />
    </button>
  );
};
