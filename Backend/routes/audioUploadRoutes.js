import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import cloudinary from '../config/cloudinaryConfig.js';
import Lesson from '../models/Lesson.js';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

const AUDIO_DIR = path.join(__dirname, '../../EthioLingoFront/assets/audio');
const DATA_DIR = path.join(__dirname, '../../EthioLingoFront/assets/data');

const languages = ['Amharic']; 
const contentTypes = ['Listening'];
// const contentTypes = ['Listening', 'Reading', 'Speaking', 'Writing'];

const lessonNameToFolderMap = {
  '1-Greetings': 'greetings',
  '2-Emergency': 'emergency',
  '3-Number': 'number',
  '4-Family': 'family',
  '5-Definite Article': 'definiteArticle',
  '6-Sentence & Months': 'sentenceMonths',
  '7-Adjective': 'adjective'
};
const folderToLessonNameMap = Object.fromEntries(
  Object.entries(lessonNameToFolderMap).map(([key, value]) => [value, key])
);


// a function to upload a single audio file to Cloudinary
const uploadAudioToCloudinary = async (filePath, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      public_id: publicId,
      folder: 'ethiolingo/audio'
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading ${filePath}:`, error.message);
    throw error;
  }
};

// Function to process data files and upload audio
const processDataFiles = async () => {
  const lessonsMap = new Map();

  for (const language of languages) {
    for (const contentType of contentTypes) {
      const contentTypeLower = contentType.toLowerCase();
      const dataDirPath = path.join(DATA_DIR, language, contentType);
      if (!fs.existsSync(dataDirPath)) {
        console.warn(`Directory does not exist: ${dataDirPath}`);
        continue;
      }

      const files = fs.readdirSync(dataDirPath).filter(file => file.endsWith('.js'));
      for (const file of files) {
        const filePath = path.join(dataDirPath, file);
        const folderName = file.replace('.js', '');
        const lessonName = folderToLessonNameMap[folderName];

        if (!lessonName) {
          console.warn(`No lesson name mapping for folder: ${folderName}`);
          continue;
        }

        console.log(`Processing file: ${filePath} for lesson: ${lessonName}`);

        let data;
        try {
          data = require(filePath).default;
        } catch (error) {
          console.error(`Failed to load ${filePath}:`, error.message);
          continue;
        }

        const lessonKey = `${language}-${lessonName}`;

        if (!lessonsMap.has(lessonKey)) {
          lessonsMap.set(lessonKey, {
            lesson_id: uuidv4(),
            lesson_name: lessonName,
            language,
            premium_required: false,
            content: {
              listening: { audioFiles: [] },
              reading: { readingExercises: [] },
              speaking: { speakingExercises: [] },
              writing: { writingExercises: [] }
            }
          });
        }

        const lesson = lessonsMap.get(lessonKey);

        // Process audio files based on content type
        if (contentTypeLower === 'listening') {
          for (const audioFile of data.audioFiles || []) {
            const sourceStr = audioFile.source?.toString() || ''; 
            const fileNameMatch = sourceStr.match(/[^/\\]+\.mp3$/); // extract file name (e.g., Record033.mp3)
            const fileName = fileNameMatch ? fileNameMatch[0] : null;

            if (!fileName) {
              console.warn(`Invalid audio source in ${filePath}: ${sourceStr}`);
              continue;
            }

            const audioPath = path.join(AUDIO_DIR, fileName);
            if (fs.existsSync(audioPath)) {
              const publicId = `${language.toLowerCase()}/${contentTypeLower}/${folderName}/${path.basename(audioPath, '.mp3')}`;
              const cloudinaryUrl = await uploadAudioToCloudinary(audioPath, publicId);
              audioFile.source = cloudinaryUrl;
              console.log(`Uploaded audio: ${audioPath} to ${cloudinaryUrl}`);
            } else {
              console.warn(`Audio file not found: ${audioPath}`);
            }
            lesson.content.listening.audioFiles.push(audioFile);
          }
        } else if (contentTypeLower === 'reading') {
          for (const exercise of data.readingExercises || []) {
            if (exercise.audioSource) {
              const sourceStr = exercise.audioSource.toString() || '';
              const fileNameMatch = sourceStr.match(/[^/\\]+\.mp3$/);
              const fileName = fileNameMatch ? fileNameMatch[0] : null;

              if (!fileName) {
                console.warn(`Invalid audio source in ${filePath}: ${sourceStr}`);
                continue;
              }

              const audioPath = path.join(AUDIO_DIR, fileName);
              if (fs.existsSync(audioPath)) {
                const publicId = `${language.toLowerCase()}/${contentTypeLower}/${folderName}/${path.basename(audioPath, '.mp3')}`;
                const cloudinaryUrl = await uploadAudioToCloudinary(audioPath, publicId);
                exercise.audioSource = cloudinaryUrl;
                console.log(`Uploaded audio: ${audioPath} to ${cloudinaryUrl}`);
              } else {
                console.warn(`Audio file not found: ${audioPath}`);
              }
            }
            lesson.content.reading.readingExercises.push(exercise);
          }
        } else if (contentTypeLower === 'speaking') {
          for (const exercise of data.speakingExercises || []) {
            if (exercise.audioSource) {
              const sourceStr = exercise.audioSource.toString() || '';
              const fileNameMatch = sourceStr.match(/[^/\\]+\.mp3$/);
              const fileName = fileNameMatch ? fileNameMatch[0] : null;

              if (!fileName) {
                console.warn(`Invalid audio source in ${filePath}: ${sourceStr}`);
                continue;
              }

              const audioPath = path.join(AUDIO_DIR, fileName);
              if (fs.existsSync(audioPath)) {
                const publicId = `${language.toLowerCase()}/${contentTypeLower}/${folderName}/${path.basename(audioPath, '.mp3')}`;
                const cloudinaryUrl = await uploadAudioToCloudinary(audioPath, publicId);
                exercise.audioSource = cloudinaryUrl;
                console.log(`Uploaded audio: ${audioPath} to ${cloudinaryUrl}`);
              } else {
                console.warn(`Audio file not found: ${audioPath}`);
              }
            }
            lesson.content.speaking.speakingExercises.push(exercise);
          }
        } else if (contentTypeLower === 'writing') {
          lesson.content.writing.writingExercises.push(...(data.writingExercises || []));
        }
      }
    }
  }
  
  return Array.from(lessonsMap.values());
};

// main function to upload audio and update database
const uploadAndUpdateDatabase = async () => {
  try {
    await connectDB();
    const lessons = await processDataFiles();

    if (lessons.length === 0) {
      console.warn('No lessons processed. Check file paths and data structure.');
      return;
    }

    //  deleteMany remove the exsting data to prevent duplicating
    await Lesson.deleteMany();
    const result = await Lesson.insertMany(lessons);
    console.log('Audio uploaded and database updated successfully! Inserted documents:', result);

    const savedLessons = await Lesson.find({});
    console.log('Verified lessons in database:', savedLessons);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error.message);
    mongoose.connection.close();
  }
};

export default uploadAndUpdateDatabase;

uploadAndUpdateDatabase();
