/**
 * Streak Manager Utility
 */
export const updateStreak = (lastActiveDateStr, currentStreak = 0) => {
  const today = new Date().toISOString().split('T')[0];
  if (!lastActiveDateStr) return { streak: 1, lastActive: today };

  const last = new Date(lastActiveDateStr);
  const now = new Date(today);
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { streak: currentStreak + 1, lastActive: today };
  } else if (diffDays === 0) {
    return { streak: currentStreak, lastActive: today };
  } else {
    return { streak: 1, lastActive: today };
  }
};
