import * as usersSchema from './schema/users';
import * as lessonsSchema from './schema/lessons';
import * as progressSchema from './schema/progress';
import * as wordsSchema from './schema/words';

export const schema = {
  ...usersSchema,
  ...lessonsSchema,
  ...progressSchema,
  ...wordsSchema,
};

export const initDbConnection = async () => {
  console.log('[DB Client] SQLite database initialized with schemas.');
};
