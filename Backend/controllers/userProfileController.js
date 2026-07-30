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


    const profile = await userProfileModel.findOneAndUpdate(
      { userId },
      {
        learningLanguage: language,
        goalTime: parsedGoalTime,
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
    const userId = req.params.userId;
    console.log(' Fetching profile for userId:', userId);

    const profile = await userProfileModel.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    return res.status(200).json(profile); 
  } catch (err) {
    console.error('🔥 Server error fetching user profile:', err.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, goalTime, profileImage } = req.body; 

    console.log(`Updating profile for userId: ${userId}`);
    console.log('New data:', { username, goalTime, profileImage });
  
    const user = await userModel.findOneAndUpdate(
      { userId }, 
      { fullName:username }, 
      { new: true } 
    );

    console.log('Updated user:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const userProfile = await userProfileModel.findOneAndUpdate(
      { userId }, 
      { goalTime, profileImage }, 
      { new: true, upsert: true } 
    );

    console.log('Updated user profile:', userProfile);

    if (!userProfile) {
      return res.status(400).json({ message: 'Failed to update user profile' });
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user,
      userProfile,
    });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};
