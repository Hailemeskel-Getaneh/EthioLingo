import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const lessons = sqliteTable('lessons', {
  lessonId: text('lesson_id').primaryKey(),
  lessonName: text('lesson_name').notNull(),
  language: text('language').notNull(),
  premiumRequired: integer('premium_required', { mode: 'boolean' }).default(false),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  syncStatus: text('sync_status').default('synced'),
  lastSynced: integer('last_synced', { mode: 'timestamp' }),
});

export const usersTable  = sqliteTable('Users', {
  userId: text('userId').primaryKey(), 
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  syncStatus: text('sync_status').default('synced'),
  lastSynced: integer('last_synced', { mode: 'timestamp' }),
});
export const userProfilesTable = sqliteTable('userProfile', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('userId').notNull().unique().references(() => usersTable.userId), 
  profileImage: text('profileImage').default('https://...'),
  status: text('status').default('free'),
  nativeLanguage: text('nativeLanguage').default('English'),
  learningLanguage: text('learningLanguage').notNull(),
  goalTime: integer('goalTime').notNull(),
  favoriteWords: text('favoriteWords').default('[]'),
});


