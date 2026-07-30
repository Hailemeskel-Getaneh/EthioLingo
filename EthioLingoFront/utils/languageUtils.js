/**
 * Ethiopian Language & Character Utilities
 */
export const toAmharicDigits = (num) => {
  const amharicDigits = [
    '፩',
    '፪',
    '፫',
    '፬',
    '፭',
    '፮',
    '፯',
    '፰',
    '፱',
    '፲',
  ];

  return String(num)
    .split('')
    .map((digit) => (Number.isNaN(Number(digit)) ? digit : amharicDigits[parseInt(digit, 10)] || digit))
    .join('');
};

export const capitalizeWord = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
