import userProfileModel from "../models/userProfileModel.js";  
import userModel from '../models/userModel.js'



export const createProfile = async (req, res) => {
  try {
    const { userId, language, goalTime } = req.body;

    if (!userId || !language || goalTime === undefined) {
      return res.status(400).json({ message: "User ID, Language, and Goal Time are required" });
    }

    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(userId);
    if (!isValidUUID) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const parsedGoalTime = parseFloat(goalTime);
    if (isNaN(parsedGoalTime)) {
      return res.status(400).json({ message: "goalTime must be a valid number" });
    }

    const userExists = await userModel.findOne({ userId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const defaultAchievements = [
      {
        record: 10,
        points: 10,
        achievedAt: new Date(),
      },
    ];

    const profile = await userProfileModel.findOneAndUpdate(
      { userId },
      {
        learningLanguage: language,
        goalTime: parsedGoalTime,
        achievements: defaultAchievements,
      },
      { new: true, upsert: true }
    );

    return res.status(200).json(profile);
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params; 
    console.log('Received userId:', userId);
    const userProfile = await userProfileModel.findOne({ userId });
    console.log('User Profile:', userProfile);

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    const user = await userModel.findOne({ userId });
    console.log('User details:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const combinedProfile = {
      ...userProfile._doc, 
      username: user.fullName, 
      email: user.email 
    };
    return res.status(200).json(combinedProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};



