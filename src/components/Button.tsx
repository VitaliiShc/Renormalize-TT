import { clsx } from 'clsx';
import { type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  type = 'button',
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white transition',
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-[#624de3] hover:bg-[#4338ca]',
        className
      )}
    >
      {children}
    </button>
  );
}
