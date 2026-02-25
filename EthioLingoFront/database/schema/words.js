import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const words = sqliteTable('words', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  amharic: text('amharic').notNull(),
  phonetic: text('phonetic'),
  english: text('english').notNull(),
  audioUrl: text('audio_url'),
  category: text('category'),
});
