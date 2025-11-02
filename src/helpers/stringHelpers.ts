export const capitalize = (str?: string) => {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
};

export const isLetterOnly = (value: string) => /^[A-Za-z]*$/i.test(value);

export const filterEnglishWords = (value: string) => {
  return (
    value
      // delete all except letters & spaces
      .replace(/[^a-zA-Z\s]/g, '')
      // delete space in start
      .replace(/^\s+/, '')
      // not allow more than 1 space
      .replace(/\s+/g, ' ')
  );
};

export const filteredNumber = (value: string) => {
  return (
    value
      // allow only numbers & dot
      .replace(/[^0-9.]/g, '')
      // delete dots in start
      .replace(/^\.+/, '')
      // allow only first dot
      .replace(/(\d*\.\d*)\..*/, '$1')
  );
};

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const highlightText = (text: string, query: string): string => {
  if (!query) return String(text);
  const escaped = escapeRegExp(query);
  const re = new RegExp(`(${escaped})`, 'gi');
  return String(text).replace(
    re,
    '<span style="background-color: tomato;">$1</span>',
  );
};
