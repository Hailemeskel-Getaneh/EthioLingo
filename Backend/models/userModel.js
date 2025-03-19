import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: () => uuidv4(),
    primaryKey: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    default: "",
  },
  verification_code_generated_time: {
    type: Date,
  },
}, {
  timestamps: true,
});

const userModel = mongoose.model("users",userSchema); 
export default userModel;
