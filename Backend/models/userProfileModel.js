import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: '/assets/images/SampleProfileImage',
    },
  status: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    nativeLanguage: {
      type: String,
      default:"English"
    },
    learningLanguage: {
      type: String,
      required: true,
    },
    goalTime: {  
      type: Number,
      required: true,  
    },
    progress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Progress",
    },
    favoriteWords: {
      type: [String],
      default: [],
    },
    achievements: [
      {
        record: {
          type: Number,
          default: 0,
        },
        points: {
          type: Number,
          default: 0,
        },
        achievedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const userProfileModel = mongoose.model('UserProfile', userProfileSchema);
export default userProfileModel;
