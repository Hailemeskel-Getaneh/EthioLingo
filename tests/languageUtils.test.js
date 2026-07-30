import { toAmharicDigits, capitalizeWord } from '../EthioLingoFront/utils/languageUtils';

describe('Language Utilities', () => {
  test('converts western digits to Amharic digits', () => {
    expect(toAmharicDigits(123)).toBe('á©áªá«');
  });

  test('capitalizes strings', () => {
    expect(capitalizeWord('amharic')).toBe('Amharic');
  });
});
