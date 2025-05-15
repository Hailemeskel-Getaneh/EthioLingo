import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    profileImage: {
      type: String,
      default: 'https://th.bing.com/th/id/R.b1b463303db368fd76ad68356d1d4f0c?rik=lY2e9ubl6ESqZg&pid=ImgRaw&r=0',
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
   
    favoriteWords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const userProfileModel = mongoose.model('UserProfile', userProfileSchema);
export default userProfileModel;
