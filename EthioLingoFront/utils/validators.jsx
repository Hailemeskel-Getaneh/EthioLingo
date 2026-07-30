

export const validateSignUp = ({ fullName, email, password ,agreeToTerms  }) => {
  const errors = {};

  if (!fullName?.trim()) {
    errors.fullName = 'Full name is required';
  }

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Invalid email format';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
    if (!agreeToTerms) {
    errors.agreeToTerms = 'You must agree to the Terms and Policy';
  }

  return errors;
};
