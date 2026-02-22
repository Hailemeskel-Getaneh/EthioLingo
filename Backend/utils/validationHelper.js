/**
 * Input Validation & Sanitization Helpers
 */
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && re.test(email.trim().toLowerCase());
};

const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
};

const isStrongPassword = (pass) => {
  return typeof pass === 'string' && pass.length >= 6;
};

module.exports = { isValidEmail, sanitizeString, isStrongPassword };
