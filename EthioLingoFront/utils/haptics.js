/**
 * Haptic Feedback Helper
 */
export const triggerHaptic = (type = 'light') => {
  try {
    console.log(`[Haptics] Triggered ${type} feedback`);
  } catch (e) {
    // Ignore fallback
  }
};
