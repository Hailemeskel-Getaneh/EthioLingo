import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: () => uuidv4(),
    primaryKey: true,
  },
  revoked: {
    type: Boolean,
    required: true,
  },
  ip_address: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  region: {
    type: String,
    default: "",
  },
  latitude: {
    type: String,
    default: "",
  },
  longitude: {
    type: String,
    default: "",
  },
  generated_at: {
    type: Date,
  },
}, {
  timestamps: true,
});

const RefreshToken = mongoose.model("refreshTokens",refreshTokenSchema); 
export default RefreshToken;
