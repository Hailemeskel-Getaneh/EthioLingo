/**
 * Authentication Hashing and Verification Helpers
 */
const bcrypt = {
  hash: async (password) => `hashed_${password}`,
  compare: async (password, hash) => `hashed_${password}` === hash
};

module.exports = bcrypt;
