import { eq, and, desc } from 'drizzle-orm';
import { lessons } from './schema';
import { getDBConnection } from './db';
import NetInfo from '@react-native-community/netinfo';
import { API_URL } from '@env';
import * as FileSystem from 'expo-file-system';
import { sql } from 'drizzle-orm';

const retryFetch = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        timeout: 5000,
      });
      if (response.ok) return response;
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    } catch (error) {
      console.log(`Fetch attempt ${i + 1}/${retries} failed: ${error.message}`);
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};

const cacheAudioFile = async (source, lessonId) => {
  try {
    if (!source) {
      console.log('No audio source provided');
      return null;
    }
    const url = source.startsWith('http') ? source : `${API_URL}/api/audio/${source}`;
    const fileName = source.split('/').pop() || `audio_${Date.now()}.mp3`;
    const localPath = `${FileSystem.documentDirectory}audio/${lessonId}/${fileName}`;
    await FileSystem.makeDirectoryAsync(localPath.split('/').slice(0, -1).join('/'), { intermediates: true });
    const { exists } = await FileSystem.getInfoAsync(localPath);
    if (!exists) {
      console.log(`Downloading audio: ${fileName}`);
      await FileSystem.downloadAsync(url, localPath);
      console.log(`Cached audio: ${fileName}`);
    } else {
      console.log(`Audio already cached: ${fileName}`);
    }
    return localPath;
  } catch (error) {
    console.error(`Failed to cache audio ${fileName}:`, error.message);
    return null;
  }
};

export const clearTestData = async () => {
  const drizzleDb = getDBConnection();
  try {
    await drizzleDb.delete(lessons).where(eq(lessons.lessonId, 'test-1')).run();
    await drizzleDb.delete(lessons).where(eq(lessons.lessonId, 'test-2')).run();
    console.log('Cleared test data from lessons table');
  } catch (error) {
    console.error('Error clearing test data:', error.message);
  }
};

export const clearDuplicateLessons = async () => {
  const drizzleDb = getDBConnection();
  try {
    await drizzleDb.run(sql`
      DELETE FROM lessons
      WHERE rowid NOT IN (
        SELECT MIN(rowid)
        FROM lessons
        GROUP BY lesson_name, language
      );
    `);
    console.log('Cleared duplicate lessons');
  } catch (error) {
    console.error('Error clearing duplicate lessons:', error.message);
  }
};

export const fetchAndCacheLessons = async (language = 'Amharic', forceFetch = false) => {
  const drizzleDb = getDBConnection();
  try {
    const state = await NetInfo.fetch();
    console.log('Network state: connected=', state.isConnected);
    if (!state.isConnected) {
      console.log('Offline: Skipping API fetch');
      return false;
    }

    const existingLessons = await drizzleDb
      .select({ lessonId: lessons.lessonId, lastSynced: lessons.lastSynced })
      .from(lessons)
      .where(language ? eq(lessons.language, language) : undefined)
      .all();
    console.log('Existing lessons count:', existingLessons.length);

    const isStale = forceFetch || existingLessons.length === 0 || existingLessons.some(
      (lesson) => !lesson.lastSynced || new Date() - new Date(lesson.lastSynced) > 24 * 60 * 60 * 1000
    );
    console.log('Cache status:', isStale ? 'stale' : 'fresh');
    if (!isStale && !forceFetch) {
      console.log('Cache is fresh, skipping API fetch');
      return true;
    }

    let json;
    try {
      const url = language
        ? `${API_URL}/api/lessons?language=${encodeURIComponent(language)}`
        : `${API_URL}/api/lessons`;
      console.log('Fetching from:', url);
      const response = await retryFetch(url);
      console.log('API response status:', response.status);
      json = await response.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to fetch lessons');
      }
    } catch (error) {
      console.error('API fetch failed, using mock data:', error.message);
      // Mock data fallback
      json = {
        success: true,
        data: [
          {
            lesson_id: 'mock-1',
            lesson_name: '1-Greetings',
            language: 'Amharic',
            content: {
              listening: {
                audioFiles: [
                  {
                    source: 'https://res.cloudinary.com/dzvpmwjus/raw/upload/v1725285186/Record033.mp3',
                    correctText: 'Hello',
                    correctOption: 'ሰላም',
                    options: ['ሰላም', 'እንዴት ነህ', 'ደህና'],
                  },
                ],
              },
              reading: {
                readingExercises: [
                  {
                    motherTongueText: 'ሰላም! እንዴት ኮ?',
                    learningText: 'Hello! How are you?',
                    audioSource: 'https://res.cloudinary.com/dzvpmwjus/raw/upload/v1725285186/Record033.mp3',
                  },
                ],
              },
              speaking: {
                speakingExercises: [
                  {
                    motherTongueText: 'ሰላም (Hello)',
                    learningText: 'Hello',
                    audioSource: 'https://res.cloudinary.com/dzvpmwjus/raw/upload/v1725285186/Record033.mp3',
                  },
                ],
              },
              writing: {
                writingExercises: [
                  {
                    motherTongueText: 'ሰላም',
                    equivalentText: 'Hello',
                  },
                ],
              },
            },
          },
          {
            lesson_id: 'mock-2',
            lesson_name: '2-Emergency',
            language: 'Amharic',
            content: {
              listening: {
                audioFiles: [
                  {
                    source: 'https://res.cloudinary.com/dzvpmwjus/raw/upload/v1725285186/emergency.mp3',
                    correctText: 'Help',
                    correctOption: 'ይቅርታ',
                    options: ['ይቅርታ', 'ሰላም', 'ደህና'],
                  },
                ],
              },
              reading: {
                readingExercises: [
                  {
                    motherTongueText: 'ይቅርታ! እርዳታ እፈልጋለሁ',
                    learningText: 'Help! I need assistance',
                    audioSource: 'https://res.cloudinary.com/dzvpmwjus/raw/upload/v1725285186/emergency.mp3',
                  },
                ],
              },
              speaking: {
                speakingExercises: [
                  {
                    motherTongueText: 'ይቅርታ (Help)',
                    learningText: 'Help',
                    audioSource: 'https://res.cloudinary.com/dzvpmwjus/raw/upload/v1725285186/emergency.mp3',
                  },
                ],
              },
              writing: {
                writingExercises: [
                  {
                    motherTongueText: 'ይቅርታ',
                    equivalentText: 'Help',
                  },
                ],
              },
            },
          },
        ],
      };
    }

    const lessonsData = [];
    for (const lesson of json.data) {
      const nameMap = {
        'Greetings': '1-Greetings',
        'Emergency': '2-Emergency',
        'Number': '3-Number',
      };
      const content = lesson.content || {};
      if (content.listening?.audioFiles) {
        for (const audio of content.listening.audioFiles) {
          if (audio.source) {
            const localPath = await cacheAudioFile(audio.source, lesson.lesson_id);
            if (localPath) audio.localPath = localPath;
          }
        }
      }
      if (content.reading?.readingExercises) {
        for (const exercise of content.reading.readingExercises) {
          if (exercise.audioSource) {
            const localPath = await cacheAudioFile(exercise.audioSource, lesson.lesson_id);
            if (localPath) exercise.localPath = localPath;
          }
        }
      }
      if (content.speaking?.speakingExercises) {
        for (const exercise of content.speaking.speakingExercises) {
          if (exercise.audioSource) {
            const localPath = await cacheAudioFile(exercise.audioSource, lesson.lesson_id);
            if (localPath) exercise.localPath = localPath;
          }
        }
      }
      lessonsData.push({
        lessonId: lesson.lesson_id,
        lessonName: nameMap[lesson.lesson_name] || lesson.lesson_name,
        language: lesson.language || 'Amharic',
        premiumRequired: false,
        content: JSON.stringify(content),
        createdAt: new Date(),
        updatedAt: new Date(),
        syncStatus: 'synced',
        lastSynced: new Date(),
      });
    }

    const batchSize = 100;
    for (let i = 0; i < lessonsData.length; i += batchSize) {
      const batch = lessonsData.slice(i, i + batchSize);
      await drizzleDb
        .insert(lessons)
        .values(batch)
        .onConflictDoUpdate({
          target: lessons.lessonId,
          set: {
            lessonName: sql`excluded.lesson_name`,
            language: sql`excluded.language`,
            content: sql`excluded.content`,
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
    console.error('Error fetching lessons:', error.message);
    return false;
  }
};

export const getLessonsFromSQLite = async (lessonName, language = 'Amharic') => {
  const drizzleDb = getDBConnection();
  if (!lessonName) {
    console.error('Invalid lessonName:', lessonName);
    return [];
  }
  if (!language || language === 'null') {
    console.warn('Language is null, defaulting to Amharic');
    language = 'Amharic';
  }
  console.log('Querying SQLite for lesson:', lessonName);
  try {
    let query = drizzleDb.select().from(lessons).where(eq(lessons.lessonName, lessonName));
    if (language) {
      query = query.where(and(eq(lessons.lessonName, lessonName), eq(lessons.language, language)));
    }
    query = query.orderBy(desc(lessons.lastSynced));
    const result = await query.all();
    console.log('SQLite results count:', result.length);
    return result.map((lesson) => ({
      lesson_id: lesson.lessonId,
      lesson_name: lesson.lessonName,
      language: lesson.language,
      content: JSON.parse(lesson.content || '{}'),
    }));
  } catch (error) {
    console.error('Error querying SQLite:', error.message);
    return [];
  }
};

export const getLessonTopics = async (language = 'Amharic') => {
  const drizzleDb = getDBConnection();
  try {
    let query = drizzleDb.select({ id: lessons.lessonId, title: lessons.lessonName, language: lessons.language }).from(lessons);
    if (language && language !== 'null') {
      query = query.where(eq(lessons.language, language));
    }
    const result = await query.all();
    console.log('Lesson topics count:', result.length);
    return result.map((lesson, index) => ({
      id: lesson.id,
      title: lesson.title,
      language: lesson.language,
      progress: [20, 50, 70, 15, 60, 30, 80][index % 7] || 0,
    }));
  } catch (error) {
    console.error('Error fetching lesson topics:', error.message);
    return [];
  }
};

export const getAvailableLanguages = async () => {
  const drizzleDb = getDBConnection();
  try {
    const result = await drizzleDb
      .selectDistinct({ language: lessons.language })
      .from(lessons)
      .all();
    console.log('Available languages:', result.length);
    return result.map((row) => row.language);
  } catch (error) {
    console.error('Error fetching languages:', error.message);
    return ['Amharic'];
  }
};

export const debugLessons = async () => {
  const drizzleDb = getDBConnection();
  try {
    const allLessons = await drizzleDb.select({ lessonId: lessons.lessonId, lessonName: lessons.lessonName, language: lessons.language }).from(lessons).all();
    console.log('All lessons count:', allLessons.length);
    return allLessons;
  } catch (error) {
    console.error('Error debugging lessons:', error.message);
    return [];
  }
};