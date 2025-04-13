import { Providers } from '@/contexts/Providers';
import { ThemeWrapper } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Providers>
      <ThemeWrapper>
        <Header />
        <main>{children}</main>
        <ScrollToTopButton />
      </ThemeWrapper>
    </Providers>
  );
}
