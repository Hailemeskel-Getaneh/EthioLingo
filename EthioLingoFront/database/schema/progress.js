import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { lessons } from './lessons';

export const userProgress = sqliteTable('user_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  lessonId: integer('lesson_id').references(() => lessons.id),
  completed: integer('completed').default(0),
  score: integer('score').default(0),
  completedAt: text('completed_at'),
});
