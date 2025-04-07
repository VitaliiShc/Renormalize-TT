'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useOrders } from '@/context/OrdersContext';
import { formatDate } from '@/utils/formatDate';
import { Order } from '@/app/types/types';
import { StatusLabel } from '@/app/components/StatusLabel';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

export interface OrdersTableRowProps {
  order: Order;
}

export function OrdersTableRow({ order }: OrdersTableRowProps) {
  const { deleteOrder } = useOrders();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <tr className="text-sm font-medium">
        <td className="text-center">#{order['Tracking ID']}</td>
        <td className="flex-row">
          <Image
            width={32}
            height={32}
            src={order['Product Image'] || '/default-image.png'}
            alt="Product"
            className="w-8 h-8 object-cover"
          />
          <span>{order['Product Name']}</span>
        </td>
        <td>{order['Customer']}</td>
        <td>{formatDate(order['Date'])}</td>
        <td>${order['Amount'].toFixed(2)}</td>
        <td>{order['Payment Mode']}</td>
        <td>
          <StatusLabel status={order.Status} />
        </td>
        <td>
          <div className="flex justify-center items-center gap-4">
            <button className="w-6 h-6 cursor-pointer">
              <Image src="/icons/edit.svg" width={25} height={24} alt="edit" />
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="w-6 h-6 cursor-pointer"
            >
              <Image
                src="/icons/trash.svg"
                width={25}
                height={24}
                alt="delete"
              />
            </button>
          </div>
        </td>
      </tr>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => deleteOrder(order['Tracking ID'])}
      />
    </>
  );
}
