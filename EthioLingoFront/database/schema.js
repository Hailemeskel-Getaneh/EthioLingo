import { getDBConnection } from './db';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';



// here is lessons table schema

export const lessons = sqliteTable('lessons', {
  lessonId: text('lesson_id').primaryKey(),
  lessonName: text('lesson_name').notNull(),
  language: text('language').notNull(),
  premiumRequired: integer('premium_required', { mode: 'boolean' }).default(false),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  syncStatus: text('sync_status').default('synced'),
});