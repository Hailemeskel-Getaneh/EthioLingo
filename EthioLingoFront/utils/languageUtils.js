/**
 * Ethiopian Language & Character Utilities
 */
export const toAmharicDigits = (num) => {
  const amharicDigits = ['á‹', 'á©', 'áª', 'á«', 'á¬', 'á­', 'á®', 'á¯', 'á°', 'á±'];
  return String(num)
    .split('')
    .map((digit) => (isNaN(digit) ? digit : amharicDigits[parseInt(digit, 10)] || digit))
    .join('');
};

export const capitalizeWord = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
