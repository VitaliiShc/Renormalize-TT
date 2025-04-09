import { OrdersProvider } from '@/contexts/OrdersContext';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <OrdersProvider>{children}</OrdersProvider>;
}
