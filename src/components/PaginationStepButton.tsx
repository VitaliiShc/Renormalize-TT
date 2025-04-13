'use client';

type PaginationStepButtonProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
};

export const PaginationStepButton = ({
  direction,
  onClick,
  disabled,
}: PaginationStepButtonProps) => {
  return (
    <button
      className="btn cursor-pointer"
      onClick={onClick}
      disabled={disabled}
    >
      {direction === 'prev' ? 'Previous' : 'Next'}
    </button>
  );
};
