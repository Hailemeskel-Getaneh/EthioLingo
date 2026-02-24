/**
 * Form Validation Utility for EthioLingoFront
 */
export const validateLoginForm = (email, password) => {
  const errors = {};
  if (!email || !email.includes('@')) {
    errors.email = 'Please enter a valid email address';
  }
  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
