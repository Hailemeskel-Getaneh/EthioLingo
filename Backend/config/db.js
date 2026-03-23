/**
 * Database client connector
 */
const db = {
  connect: async () => console.log('Database connected successfully.'),
  query: async (sql) => []
};

module.exports = db;
