'use client';

import { useEffect, useState } from 'react';

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
      className={`fixed bottom-6 right-6 z-50 px-3 py-2 rounded-full bg-blue-600 text-white shadow-lg transition-opacity duration-300 hover:bg-blue-700 ${
        isAtTop ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};
