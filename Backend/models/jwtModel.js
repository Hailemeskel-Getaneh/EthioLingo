import mongoose from 'mongoose';

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
    type: Bool,
    required: true,
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

const RefreshToken = mongoose.model("refreshToken",refreshTokenSchema); 
export default RefreshToken;
