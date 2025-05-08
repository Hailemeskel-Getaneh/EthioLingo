import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const lessons = sqliteTable('lessons', {
  lessonId: text('lesson_id').primaryKey(),
  lessonName: text('lesson_name').notNull(),
  language: text('language').notNull(),
  premiumRequired: integer('premium_required', { mode: 'boolean' }).notNull().default(false),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  syncStatus: text('sync_status').notNull().default('synced'),
  lastSynced: integer('last_synced', { mode: 'timestamp' }),
});