import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema(
  {
    progressId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    achievements: {
      type: [String],
      default: [],
    },
    notifications: {
      type: [String],
      default: [],
    },
    points: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Map,
      of: new mongoose.Schema(
        {
          writing: {
            score: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
          },
          listening: {
            score: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
          },
          reading: {
            score: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
          },
          speaking: {
            score: { type: Number, default: 0 },
            completed: { type: Boolean, default: false },
          },
        },
        { _id: false }
      ),
      default: {},
    },
    lastPracticedDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Correct model export
const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress;
