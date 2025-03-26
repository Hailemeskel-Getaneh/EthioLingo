import userProfileModel from "../models/userProfileModel.js";  
import userModel from '../models/userModel.js'


export const createProfile = async (req, res) => {
  const { userId } = req.params;
  const { language, goalTime } = req.body;

  try {

    if (!language || !goalTime) {
      return res.status(400).json({ message: 'Language and goal time are required' });
    }


    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { learningLanguage: language, goalTime },
      { new: true, upsert: true }  
    );

    res.status(200).json({ message: 'Profile created/updated successfully', profile });
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    res.status(500).json({ message: 'Server Error: Unable to create or update profile' });
  }
};


// 📌 Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

   
    const profile = await userProfileModel.findOne({ userId }).populate("userId");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

  
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, profileImage, userGoal } = req.body;


    if (!username && !profileImage && !userGoal) {
      return res.status(400).json({ message: "At least one field must be updated." });
    }

    // Step 1: Update the UserProfile model
    const updatedProfile = await userProfileModel.findOneAndUpdate(
      { userId },
      { username, profileImage, userGoal },
      { new: true }  // Return updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Step 2: Update the User model (Username and Profile Image)
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { username, profileImage },  // Only update the username and profileImage in the User model
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated profile data
    res.status(200).json({ message: "Profile updated successfully", updatedProfile, updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};