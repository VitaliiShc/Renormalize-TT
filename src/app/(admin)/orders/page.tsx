import { Suspense } from 'react';
import { Table } from '@/app/(admin)/orders/components/Table';
import { Toolbar } from '@/components/Toolbar';
import { Pagination } from '@/components/Pagination';

export default function OrdersPage() {
  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <Toolbar />
        <Table />
        <Pagination />
      </Suspense>
    </section>
  );
}
