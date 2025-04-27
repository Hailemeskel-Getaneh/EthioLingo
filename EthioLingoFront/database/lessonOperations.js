import { eq } from 'drizzle-orm';
import { lessons } from './schema';
import { getDBConnection } from './db';
import NetInfo from '@react-native-community/netinfo';
import {API_URL} from '@env';


// Test lesson insert (unchanged)
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

// Fetch and cache lessons from backend
export const fetchAndCacheLessons = async (language = 'Amharic') => {
  const drizzleDb = await getDBConnection();
  try {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      console.log('Offline: Skipping API fetch');
      return false;
    }

    const response = await fetch(`${API_URL}/api/lessons?language=${language}`);
    const json = await response.json();
    if (!json.success) {
      throw new Error(json.message || 'Failed to fetch lessons');
    }

    const lessonsData = json.data.map((lesson) => ({
      lessonId: lesson.lesson_id,
      lessonName: lesson.lesson_name,
      language: lesson.language,
      premiumRequired: false, // Adjust if backend provides this
      content: JSON.stringify(lesson.content),
      createdAt: new Date(),
      updatedAt: new Date(),
      syncStatus: 'synced',
    }));

    // Upsert lessons (insert or update)
    for (const lesson of lessonsData) {
      await drizzleDb
        .insert(lessons)
        .values(lesson)
        .onConflictDoUpdate({
          target: lessons.lessonId,
          set: lesson,
        })
        .run();
    }
    console.log('Lessons cached:', lessonsData.length);
    return true;
  } catch (error) {
    console.error('Error fetching lessons:', error.message);
    return false;
  }
};

// Get lessons from SQLite
export const getLessonsFromSQLite = async (lessonName) => {
  const drizzleDb = await getDBConnection();
  const result = await drizzleDb
    .select()
    .from(lessons)
    .where(eq(lessons.lessonName, lessonName))
    .all();
  return result.map((lesson) => ({
    lesson_id: lesson.lessonId,
    lesson_name: lesson.lessonName,
    language: lesson.language,
    content: JSON.parse(lesson.content),
  }));
};