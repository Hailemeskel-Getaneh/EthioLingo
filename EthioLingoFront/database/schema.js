import { getDBConnection } from './db';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  lastname: text('lastname'),
});


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
