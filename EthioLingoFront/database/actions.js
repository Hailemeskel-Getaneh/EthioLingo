import { getDBConnection } from './db';

export const insertUser = async (id, fullName, email, password) => {
  const db = await getDBConnection();

  if (!db) {
    console.error('Database connection is not available');
    return;
  }

  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO users (id, fullName, email, password, isSynced) VALUES (?, ?, ?, ?, ?)`,
      [id, fullName, email, password, 0],
      (_, result) => {
        console.log('User inserted:', result);
      },
      (_, error) => {
        console.error('Error inserting user:', error);
        return false;
      }
    );
  });
};
