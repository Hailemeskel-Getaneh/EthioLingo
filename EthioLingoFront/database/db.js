import * as SQLite from 'expo-sqlite';
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";
let db;

export const getDBConnection = async () => {
  if (!db) {
    try {
      const expo = openDatabaseSync("ethiolingo.db");
      const db = drizzle(expo);
      console.log('Database opened:', db);
      await db.select().from("users");
    } catch (error) {
      console.error('Failed to open the database:', error);
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
