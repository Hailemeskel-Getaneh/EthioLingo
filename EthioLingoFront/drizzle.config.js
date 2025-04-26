/** @type {import('drizzle-kit').Config} */
const config = {
  schema: './database/schema.js',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
};

export default config;
