import { eq } from 'drizzle-orm';
import { lessons } from './schema';
import { getDBConnection } from './db';
import NetInfo from '@react-native-community/netinfo';
import { API_URL } from '@env';

export const fetchAndCacheLessons = async (language = 'Amharic') => {
  const drizzleDb = await getDBConnection();
  try {
    console.log('Using API_URL:', API_URL);
    const state = await NetInfo.fetch();
    console.log('Network state:', state);
    if (!state.isConnected) {
      console.log('Offline: Skipping API fetch');
      return false;
    }

    const url = `${API_URL}/api/lessons?language=${language}`;
    console.log('Fetching from:', url);
    const response = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } });
    console.log('Response:', { status: response.status, statusText: response.statusText, ok: response.ok });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    console.log('API response:', JSON.stringify(json, null, 2));
    if (!json.success) {
      throw new Error(json.message || 'Failed to fetch lessons');
    }

    const lessonsData = json.data.map((lesson, index) => {
      const nameMap = {
        'Greetings': '1-Greetings',
        'Emergency': '2-Emergency',
        'Number': '3-Number',
        // Add more mappings as needed
      };
      return {
        lessonId: lesson.lesson_id,
        lessonName: nameMap[lesson.lesson_name] || lesson.lesson_name,
        language: lesson.language,
        premiumRequired: false,
        content: JSON.stringify(lesson.content),
        createdAt: new Date(),
        updatedAt: new Date(),
        syncStatus: 'synced',
      };
    });

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
    console.error('Error fetching lessons:', error.message, error.stack);
    return false;
  }
};

export const getLessonsFromSQLite = async (lessonName) => {
  const drizzleDb = await getDBConnection();
  console.log('Querying SQLite for lessonName:', lessonName);
  const result = await drizzleDb
    .select()
    .from(lessons)
    .where(eq(lessons.lessonName, lessonName))
    .all();
  console.log('SQLite query result:', JSON.stringify(result, null, 2));
  return result.map((lesson) => ({
    lesson_id: lesson.lessonId,
    lesson_name: lesson.lessonName,
    language: lesson.language,
    content: JSON.parse(lesson.content),
  }));
};

export const getLessonTopics = async () => {
  const drizzleDb = await getDBConnection();
  const result = await drizzleDb
    .select({ id: lessons.lessonId, title: lessons.lessonName })
    .from(lessons)
    .all();
  return result.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    progress: [20, 50, 70, 15, 60, 30, 80][index % 7] || 0,
  }));
};

export const debugLessons = async () => {
  const drizzleDb = await getDBConnection();
  const allLessons = await drizzleDb.select().from(lessons).all();
  console.log('All lessons in SQLite:', JSON.stringify(allLessons, null, 2));
  return allLessons;
};

export const testLessonInsert = async () => {
  const drizzleDb = await getDBConnection();
  // Check if lessons table is empty
  const existingLessons = await drizzleDb.select().from(lessons).all();
  if (existingLessons.length > 0) {
    console.log('Lessons table not empty, skipping test lesson insert');
    return;
  }

  const testLessons = [
    {
      lessonId: '1',
      lessonName: '1-Greetings',
      language: 'Amharic',
      premiumRequired: false,
      content: JSON.stringify({
        listening: { audioFiles: [{ source: 'greetings.mp3', correctText: 'Selam', correctOption: 'A', options: ['A', 'B'] }] },
        reading: { readingExercises: [] },
        speaking: { speakingExercises: [] },
        writing: { writingExercises: [] },
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      syncStatus: 'synced',
    },
    {
      lessonId: '2',
      lessonName: '2-Emergency',
      language: 'Amharic',
      premiumRequired: false,
      content: JSON.stringify({
        listening: { audioFiles: [{ source: 'emergency.mp3', correctText: 'Help', correctOption: 'A', options: ['A', 'B'] }] },
        reading: { readingExercises: [] },
        speaking: { speakingExercises: [] },
        writing: { writingExercises: [] },
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
      syncStatus: 'synced',
    },
  ];

  for (const lesson of testLessons) {
    await drizzleDb.delete(lessons).where(eq(lessons.lessonId, lesson.lessonId)).run();
    await drizzleDb.insert(lessons).values(lesson).run();
  }
  const result = await drizzleDb.select().from(lessons).all();
  console.log('Test lessons inserted:', result);
};