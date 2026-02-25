const users = [];

const findUserByEmail = (email) => users.find((u) => u.email === email);

const createUser = (userData) => {
  const newUser = { id: users.length + 1, ...userData, streak: 0, totalXp: 0 };
  users.push(newUser);
  return newUser;
};

module.exports = { findUserByEmail, createUser };
