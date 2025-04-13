import Image from 'next/image';

type SortIconProps = {
  sort: string | null;
  reverse: boolean;
  column: string;
};

export const SortIcon = ({ sort, reverse, column }: SortIconProps) => {
  let iconSrc = '/icons/caret-sort.svg';

  switch (true) {
    case sort === column && !reverse:
      iconSrc = '/icons/caret-down.svg';
      break;
    case sort === column && reverse:
      iconSrc = '/icons/caret-up.svg';
      break;
    default:
      iconSrc = '/icons/caret-sort.svg';
  }

  return <Image src={iconSrc} width={16} height={16} alt="sort" />;
};
