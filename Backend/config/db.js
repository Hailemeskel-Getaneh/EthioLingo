import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log(`❌ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default DatabaseConnection;
