import { updateStreak } from '../EthioLingoFront/utils/streakManager';

describe('Streak Manager', () => {
  test('increments streak when active consecutive days', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const result = updateStreak(yesterday, 4);
    expect(result.streak).toBe(5);
  });
});
