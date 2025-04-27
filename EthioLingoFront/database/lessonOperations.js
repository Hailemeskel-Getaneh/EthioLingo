import { eq, and } from 'drizzle-orm';
import { lessons } from './schema';
import { getDBConnection } from './db';
import NetInfo from '@react-native-community/netinfo';
import { API_URL } from '@env';

// Utility function for retrying fetch requests
const retryFetch = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } });
      if (response.ok) return response;
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Retrying fetch (${i + 1}/${retries}) after ${delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

// Fetch and cache lessons for a specific language or all languages
export const fetchAndCacheLessons = async (language = null) => {
  const drizzleDb = await getDBConnection();
  try {
    const state = await NetInfo.fetch();
    console.log('Network state:', state);
    if (!state.isConnected) {
      console.log('Offline: Skipping API fetch');
      return false;
    }

    // Check cache freshness (24-hour TTL)
    const existingLessons = await drizzleDb
      .select()
      .from(lessons)
      .where(language ? eq(lessons.language, language) : undefined)
      .all();
    const isStale = existingLessons.some(
      (lesson) => !lesson.lastSynced || new Date() - new Date(lesson.lastSynced) > 24 * 60 * 60 * 1000 // 24 hours
    );
    if (!isStale && existingLessons.length > 0) {
      console.log('Cache is fresh, skipping API fetch');
      return true;
    }

    const url = language
      ? `${API_URL}/api/lessons?language=${encodeURIComponent(language)}`
      : `${API_URL}/api/lessons`;
    console.log('Using API_URL:', API_URL);
    console.log('Fetching from:', url);

    const response = await retryFetch(url);
    console.log('Response:', { status: response.status, statusText: response.statusText, ok: response.ok });

    const json = await response.json();
    console.log('API response:', JSON.stringify(json, null, 2));
    if (!json.success) {
      throw new Error(json.message || 'Failed to fetch lessons');
    }

    const lessonsData = json.data.map((lesson) => {
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
        lastSynced: new Date(),
      };
    });

    // Batch insert to handle large datasets efficiently
    const batchSize = 100;
    for (let i = 0; i < lessonsData.length; i += batchSize) {
      const batch = lessonsData.slice(i, i + batchSize);
      await drizzleDb
        .insert(lessons)
        .values(batch)
        .onConflictDoUpdate({
          target: lessons.lessonId,
          set: {
            lessonName: lessons.lessonName,
            language: lessons.language,
            content: lessons.content,
            premiumRequired: lessons.premiumRequired,
            updatedAt: new Date(),
            syncStatus: 'synced',
            lastSynced: new Date(),
          },
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

// Get lessons from SQLite for a specific lesson name and optional language
export const getLessonsFromSQLite = async (lessonName, language = null) => {
  const drizzleDb = await getDBConnection();
  console.log('Querying SQLite for lessonName:', lessonName, 'language:', language);
  let query = drizzleDb.select().from(lessons).where(eq(lessons.lessonName, lessonName));
  if (language) {
    query = query.where(and(eq(lessons.lessonName, lessonName), eq(lessons.language, language)));
  }
  const result = await query.all();
  console.log('SQLite query result:', JSON.stringify(result, null, 2));
  return result.map((lesson) => ({
    lesson_id: lesson.lessonId,
    lesson_name: lesson.lessonName,
    language: lesson.language,
    content: JSON.parse(lesson.content || '{}'), // Handle null/empty content
  }));
};

// Get lesson topics, optionally filtered by language
export const getLessonTopics = async (language = null) => {
  const drizzleDb = await getDBConnection();
  let query = drizzleDb.select({ id: lessons.lessonId, title: lessons.lessonName, language: lessons.language }).from(lessons);
  if (language) {
    query = query.where(eq(lessons.language, language));
  }
  const result = await query.all();
  return result.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    language: lesson.language,
    progress: [20, 50, 70, 15, 60, 30, 80][index % 7] || 0, // Mock progress
  }));
};

// Get available languages from SQLite
export const getAvailableLanguages = async () => {
  const drizzleDb = await getDBConnection();
  const result = await drizzleDb
    .selectDistinct({ language: lessons.language })
    .from(lessons)
    .all();
  console.log('Available languages:', result);
  return result.map((row) => row.language);
};

// Debug all lessons in SQLite
export const debugLessons = async () => {
  const drizzleDb = await getDBConnection();
  const allLessons = await drizzleDb.select().from(lessons).all();
  console.log('All lessons in SQLite:', JSON.stringify(allLessons, null, 2));
  return allLessons;
};

// Insert test lessons only if SQLite is empty for the specified language
export const testLessonInsert = async (language = 'Amharic') => {
  const drizzleDb = await getDBConnection();
  const existingLessons = await drizzleDb.select().from(lessons).where(eq(lessons.language, language)).all();
  if (existingLessons.length > 0) {
    console.log(`Lessons table not empty for ${language}, skipping test lesson insert`);
    return;
  }

  const testLessons = [
    {
      lessonId: '1',
      lessonName: '1-Greetings',
      language,
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
      lastSynced: new Date(),
    },
    {
      lessonId: '2',
      lessonName: '2-Emergency',
      language,
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
      lastSynced: new Date(),
    },
  ];

  for (const lesson of testLessons) {
    await drizzleDb.delete(lessons).where(eq(lessons.lessonId, lesson.lessonId)).run();
    await drizzleDb.insert(lessons).values(lesson).run();
  }
  const result = await drizzleDb.select().from(lessons).where(eq(lessons.language, language)).all();
  console.log(`Test lessons inserted for ${language}:`, result);
};