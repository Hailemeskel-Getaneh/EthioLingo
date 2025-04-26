import { eq } from 'drizzle-orm';
import { lessons } from './schema';
import { getDBConnection } from './db';

export const testLessonInsert = async () => {
  const drizzleDb = await getDBConnection();
  const testLesson = {
    lessonId: 'test-1',
    lessonName: 'Test Lesson',
    language: 'Amharic',
    premiumRequired: false,
    content: JSON.stringify({
      listening: { audioFiles: [{ source: 'test.mp3', correctText: 'Hello', correctOption: 'A', options: ['A', 'B'] }] },
      reading: { readingExercises: [{ id: 1, motherTongueText: 'Selam', learningText: 'Hello', audioSource: 'read.mp3' }] },
      speaking: { speakingExercises: [] },
      writing: { writingExercises: [] },
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
    syncStatus: 'synced',
  };

  await drizzleDb.delete(lessons).where(eq(lessons.lessonId, 'test-1')).run();
  await drizzleDb.insert(lessons).values(testLesson).run();
  const result = await drizzleDb.select().from(lessons).where(eq(lessons.lessonId, 'test-1')).all();
  console.log('Test lesson:', result);
};
