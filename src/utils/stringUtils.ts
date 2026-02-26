export const capitalize = (str?: string | null | undefined) => {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
};

export const isLetterOnly = (value: string) => /^[A-Za-z]*$/i.test(value);

export const sanitizeInputValue = (value: string, type: string | number) => {
  if (type === 'number') {
    return value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  }
  return value
    .replace(/[^A-Za-z0-9-\s]/g, '') // only a-z, numbers, - and space
    .replace(/^[^A-Za-z]+/, '') // string start with english letter
    .replace(/\s{2,}/g, ' ') // max 1 space
    .slice(0, 21);
};
