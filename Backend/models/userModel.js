import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


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
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    default: "",
  },
  verificationCodeCreatedAt: {
    type: Date,
  },
  isFirstLogin: { 
    type: Boolean, 
    default: true 
  },
}, {
  timestamps: true,
});

const userModel = mongoose.model("users",userSchema); 
export default userModel;
