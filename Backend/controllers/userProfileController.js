import userProfileModel from "../models/userProfileModel.js";  
import userModel from '../models/userModel.js'


export const createProfile = async (req, res) => {
  try {
    const { userId, language, goalTime } = req.body;

    if (!userId || !language || !goalTime) {
      return res.status(400).json({ message: "User ID, Language, and Goal Time are required" });
    }

    const userExists = await userModel.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = await userProfileModel.findOneAndUpdate(
      { userId },
      { learningLanguage: language, goalTime },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Profile created/updated successfully", profile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    res.status(500).json({ message: "Server Error: Unable to create or update profile" });
  }
};



// 📌 Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await userProfileModel.findOne({ userId: req.params.userId })
      .populate("userId", "username email");  

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};


