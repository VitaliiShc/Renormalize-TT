'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const Modal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
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

  return !isOpen
    ? null
    : createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 "
          onClick={onClose}
        >
          <div
            className="bg-white dark:bg-[#1f1f2e] p-6 rounded-xl w-full max-w-sm shadow-lg"
            onClick={(evt) => evt.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Confirm deletion</h2>
            <p className="mb-6">Are you sure you want to delete this order?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-md border border-gray-400 dark:border-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      );
};
