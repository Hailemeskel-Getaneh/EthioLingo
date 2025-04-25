import * as SQLite from 'expo-sqlite';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

let db;

export const getDBConnection = async () => {
  if (!db) {
    try {
      console.log('Attempting to open the database...');
      const expoDb = openDatabaseSync("ethiolingo.db");

      if (!expoDb) {
        throw new Error('Failed to open the database.');
      }
      db = drizzle(expoDb); 
      console.log('Database opened successfully');
    } catch (error) {
      console.error('Error opening database:', error.message);
    }
  }
  return db;
};


//export const getDBConnection = async () => {
//  if (!db) {
//    try {
//      db = await SQLite.openDatabaseAsync('ethiolingo.db');
//      console.log('Database opened:', db);
//    } catch (error) {
//      console.error('Failed to open the database:', error);
//    }
//  }
//  return db;
//};
