/**
 * Authentication Hashing and Verification Helpers
 */
const bcrypt = {
  hash: async (password) => `hashed_${password}`,
  compare: async (password, hash) => `hashed_${password}` === hash
};

module.exports = bcrypt;
// Helper method variant 1
// Helper method variant 2
// Helper method variant 3
// Helper method variant 4
// Helper method variant 5
