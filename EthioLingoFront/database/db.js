import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { lessons,usersTable,userProfilesTable} from './schema';

let db;

export const getDBConnection = () => {
  if (!db) {
    const expoDb = SQLite.openDatabaseSync('ethiolingo.db');
    if (!expoDb) throw new Error('Failed to open the database.');
    db = drizzle(expoDb, { schema: { lessons, usersTable , userProfilesTable  } });
    console.log('Database opened successfully');
  }
  return db;
};
export const dropUsersTable = async () => {
  const db = await getDBConnection();

  try {
    await db.run(`DROP TABLE IF EXISTS userProfile`);
    console.log(' Dropped userProfile table');
  } catch (error) {
    console.error(' Failed to drop users table:', error);
  }
};

export const initializeDatabase = async () => {
  const drizzleDb = await getDBConnection();


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
          sync_status TEXT DEFAULT 'synced',
          last_synced INTEGER
        );
        CREATE INDEX IF NOT EXISTS idx_lesson_name ON lessons(lesson_name);
        CREATE INDEX IF NOT EXISTS idx_language ON lessons(language);
      `,
    },
    {
      name:'Users',
      query:`
      CREATE TABLE IF NOT EXISTS Users (
	    userId text PRIMARY KEY NOT NULL,
	    full_name text NOT NULL,
      email text NOT NULL,
      created_at integer NOT NULL,
      updated_at integer NOT NULL,
      sync_status text DEFAULT 'synced',
      last_synced integer
    );
      `
    },
    {
      name:'userProfile',
      query: `
    CREATE TABLE IF NOT EXISTS userProfile (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      userId text NOT NULL UNIQUE,  -- ✅ Make this UNIQUE
      profileImage text DEFAULT 'https://...',
      status text DEFAULT 'free',
      nativeLanguage text DEFAULT 'English',
      learningLanguage text NOT NULL,
      goalTime integer NOT NULL,
      favoriteWords text DEFAULT '[]',
      FOREIGN KEY (userId) REFERENCES Users(userId) ON UPDATE NO ACTION ON DELETE NO ACTION
    );
  `
}
  ];

  for (const table of tableQueries) {
    await drizzleDb.run(table.query);
    console.log(`${table.name} table created successfully`);
  }
};