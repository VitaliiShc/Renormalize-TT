import React from 'react';
import clsx from 'clsx';
import { OrderStatus } from '@/app/types/types';

export interface StatusLabelProps {
  status: OrderStatus;
}

const statusStyles = {
  [OrderStatus.Delivered]: 'text-[#1f9254] bg-[#ebf9f1]',
  [OrderStatus.Process]: 'text-[#cd6200] bg-[#fef2e5]',
  [OrderStatus.Cancelled]: 'text-[#a30d11] bg-[#fbe7e8]',
};

export function StatusLabel({ status }: StatusLabelProps) {
  const label = status;
  const styles = statusStyles[status];

  return (
    <div
      className={clsx(
        'inline-flex items-center py-2 px-3 rounded-[22] text-xs font-medium',
        styles
      )}
    >
      {label}
    </div>
  );
}
