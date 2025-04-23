import * as SQLite from 'expo-sqlite';

let db;

export const getDBConnection = async () => {
  if (!db) {
    try {
      db = await SQLite.openDatabaseAsync('ethiolingo.db');
      console.log('Database opened:', db);
    } catch (error) {
      console.error('Failed to open the database:', error);
    }
  }
  return db;
};
