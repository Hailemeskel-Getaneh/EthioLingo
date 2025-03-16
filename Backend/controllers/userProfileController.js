import userProfileModel from '../models/userProfileModel.js';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId; 

   
    const userProfile = await userProfileModel.findOne({ userId }).populate('userId', 'username email');

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};
