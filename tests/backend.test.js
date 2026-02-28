const { isValidEmail, sanitizeString } = require('../Backend/utils/validationHelper');

describe('Validation Helpers', () => {
  test('validates email addresses correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
  });

  test('sanitizes input strings', () => {
    expect(sanitizeString('Hello <script>')).toBe('Hello script');
  });
});
