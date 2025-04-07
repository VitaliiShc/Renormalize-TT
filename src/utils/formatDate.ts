export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-');

  if (!year || !month || !day) {
    return isoDate;
  }

  return `${day}/${month}/${year}`;
};
