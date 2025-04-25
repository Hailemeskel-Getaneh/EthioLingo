import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { lessons } from './schema';

let db;

export const getDBConnection = async () => {
  if (!db) {
    const expoDb = SQLite.openDatabaseSync('ethiolingo.db');
    if (!expoDb) throw new Error('Failed to open the database.');
    db = drizzle(expoDb, { schema: { lessons } });
    console.log('Database opened successfully');
  }
  return db;
};

export const initializeDatabase = async () => {
  const drizzleDb = await getDBConnection();
  
  //  table creation queries in a modular way for future scalability
  const tableQueries = [
    {
      name: 'lessons',
      query: `
        CREATE TABLE IF NOT EXISTS lessons (
          lesson_id TEXT PRIMARY KEY,
          lesson_name TEXT NOT NULL,
          language TEXT NOT NULL,
          premium_required INTEGER DEFAULT 0,
          content TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL,
          sync_status TEXT DEFAULT 'synced'
        )
      `,
    },
    // here we can add more tables in the future, e.g., progress
  ];

  for (const table of tableQueries) {
    await drizzleDb.run(table.query);
    console.log(`${table.name} table created successfully`);
  }
};