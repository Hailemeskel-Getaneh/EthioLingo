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

export const initializeDatabase = () => {
  const expoDb = SQLite.openDatabaseSync('ethiolingo.db');
  try {
    expoDb.execSync(`
      PRAGMA journal_mode = WAL;
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
    `);
    console.log('Lessons table initialized successfully');
  } catch (error) {
    console.error('Table initialization failed:', error.message);
    const tableExists = expoDb.execSync(`SELECT name FROM sqlite_master WHERE type='table' AND name='lessons';`).length > 0;
    if (!tableExists) {
      throw new Error('No lessons table exists and initialization failed');
    }
    console.log('Using existing lessons table');
  }
};