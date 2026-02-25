import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  streak: integer('streak').default(0),
  totalXp: integer('total_xp').default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});
