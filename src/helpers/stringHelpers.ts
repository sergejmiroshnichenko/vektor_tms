export const capitalize = (str?: string) => {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
};

export const isLetterOnly = (value: string) => {
  return /^[A-Za-z]*$/i.test(value);
};
