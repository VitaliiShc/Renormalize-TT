import { Providers } from '@/contexts/Providers';
import { ThemeWrapper } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Providers>
      <ThemeWrapper>
        <Header />
        <main>{children}</main>
      </ThemeWrapper>
    </Providers>
  );
}
