'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useOrders } from '@/contexts/OrdersContext';
import { formatDate } from '@/utils/formatDate';
import { Order } from '@/types/types';
import { ConfirmModal } from '@/components/ConfirmModal';
import { StatusLabel } from '@/components/ui/StatusLabel';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types/types';

type TableRowProps = {
  order: Order;
};

export const TableRow = ({ order }: TableRowProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { deleteOrder } = useOrders();
  const { theme } = useTheme();
  const isDarkTheme = theme === Theme.Dark;

  return (
    <>
      <tr
        className={clsx(
          'text-xs h-16',
          isDarkTheme ? 'odd:bg-[#26264f]' : 'odd:bg-[#f7f6fe]'
        )}
      >
        <td className="text-center px-2">#{order['Tracking ID']}</td>
        <td className="px-2">
          <div className="flex gap-2 items-center">
            <Image
              width={32}
              height={32}
              src={order['Product Image'] || '/default-image.png'}
              alt="Product"
              className="w-8 h-8 object-cover rounded-lg"
            />
            <p>{order['Product Name']}</p>
          </div>
        </td>
        <td className="px-2">{order['Customer']}</td>
        <td className="px-2">{formatDate(order['Date'])}</td>
        <td className="px-2">${order['Amount'].toFixed(2)}</td>
        <td className="px-2">{order['Payment Mode']}</td>
        <td className="px-2">
          <StatusLabel status={order.Status} />
        </td>
        <td className="px-2">
          <div className="flex justify-center items-center gap-4">
            <button className="w-6.25 h-6 cursor-pointer">
              <Image src="/icons/edit.svg" width={25} height={24} alt="edit" />
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="w-6.25 h-6 cursor-pointer"
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

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => deleteOrder(order['Tracking ID'])}
      />
    </>
  );
};
