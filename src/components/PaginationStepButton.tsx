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
      className="cursor-pointer text-[#9e9e9e] text-xs hover:text-inherit transition duration-300 ease-linear"
      onClick={onClick}
      disabled={disabled}
    >
      {direction === 'prev' ? 'Previous' : 'Next'}
    </button>
  );
};
