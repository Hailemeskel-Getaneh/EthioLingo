import { getDBConnection } from './db';

export const createUserTable = async () => {
  const db = await getDBConnection();

  if (!db) {
    console.error('Database connection is not available');
    return;
  }

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        fullName TEXT,
        email TEXT UNIQUE,
        password TEXT,
        isSynced INTEGER DEFAULT 0
      );`,
      [],
      () => {
        console.log('Table created successfully');
      },
      (error) => {
        console.error('Error creating table:', error);
      }
    );
  });
};
export const saveUserToLocalDB = async (user) => {
    const db = await getDBConnection();
  
    if (!db) {
      console.error('No DB connection');
      return;
    }
  
    const { id, fullName, email, password } = user;
  
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (id, fullName, email, password, isSynced) VALUES (?, ?, ?, ?, 0);`,
        [id, fullName, email, password],
        (_, result) => {
          console.log('User saved locally:', result);
        },
        (error) => {
          console.error('Error saving user:', error);
        }
      );
    });
  };

export const getAllUsersFromLocalDB = async () => {
  const db = await getDBConnection();

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users;`,
        [],
        (_, result) => {
          const users = result.rows._array;
          console.log('Fetched users from SQLite:', users);
          resolve(users);
        },
        (_, error) => {
          console.error('Error fetching users:', error);
          reject(error);
        }
      );
    });
  });
};
