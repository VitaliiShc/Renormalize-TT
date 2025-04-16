'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types/types';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === Theme.Dark;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    isOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50"
        onClick={onClose}
      >
        <div
          className={clsx(
            'p-6 rounded-xl w-full max-w-sm',
            isDarkTheme ? 'bg-[#141432]' : 'bg-[#e0e0e0]'
          )}
          onClick={(evt) => evt.stopPropagation()}
        >
          <h2 className="text-lg font-semibold mb-4">Confirm deletion</h2>
          <p className="mb-6">Are you sure you want to delete this item?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-400 dark:border-gray-600 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 text-sm rounded-md bg-[#A30D11] text-white hover:bg-red-600  cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};
