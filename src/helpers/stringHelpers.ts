export const capitalize = (str?: string) => {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
};

export const isLetterOnly = (value: string) => /^[A-Za-z]*$/i.test(value);

export const sanitizeInputValue = (value: string, type: string | number) => {
  if (type === 'number') {
    return value.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
  }
  return /^[A-Za-z]/.test(value) ? value : '';
};
