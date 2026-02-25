import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const lessons = sqliteTable('lessons', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  category: text('category').notNull(),
  difficulty: text('difficulty').default('Beginner'),
  orderIndex: integer('order_index').default(1),
  isPublished: integer('is_published').default(1),
});
