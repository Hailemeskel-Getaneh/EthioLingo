/**
 * Quiz Score & Accuracy Calculator Helper
 */
export const calculateQuizScore = (correctCount, totalQuestions, timeTakenSeconds = 0) => {
  if (!totalQuestions || totalQuestions === 0) return { score: 0, percentage: 0 };
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const timeBonus = Math.max(0, 100 - timeTakenSeconds * 2);
  const score = correctCount * 10 + timeBonus;

  return {
    score,
    percentage,
    passed: percentage >= 70,
  };
};
