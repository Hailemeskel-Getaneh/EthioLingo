
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  lesson_id: { type: String, unique: true, required: true },
  lesson_name: { type: String, required: true },
  language: { type: String, required: true },
  premium_required: { type: Boolean, default: false },
  content: {
    listening: {
      audioFiles: [{
        source: String,
        correctText: String,
        correctOption: String,
        options: [String]
      }]
    },
    reading: {
      readingExercises: [{
        id: Number,
        motherTongueText: String,
        learningText: String,
        audioSource: String
      }]
    },
    speaking: {
      speakingExercises: [{
        id: Number,
        motherTongueText: String,
        learningText: String,
        audioSource: String
      }]
    },
    writing: {
      writingExercises: [{
        id: Number,
        motherTongueText: String,
        equivalentText: String
      }]
    }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;