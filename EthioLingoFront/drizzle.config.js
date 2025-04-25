import type { Config } from 'drizzle-kit';

export default {
  schema: './database/schema.js',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;
