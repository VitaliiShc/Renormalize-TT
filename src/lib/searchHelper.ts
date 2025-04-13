export type SearchParams = Record<string, string | number | boolean | null>;

export const getSearchWith = (
  currentParams: URLSearchParams,
  newParams: SearchParams
): string => {
  const params = new URLSearchParams(currentParams.toString());

  Object.entries(newParams).forEach(([key, value]) => {
    if (value === null || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  return params.toString();
};
