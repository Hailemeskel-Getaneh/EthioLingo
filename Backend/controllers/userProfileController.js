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

export const  saveLanguage =async (req,res)=>{
  try {
      const { userId, selectedLanguage } = req.body;

      if (!userId || !selectedLanguage) {
          return res.status(400).json({ message: 'User ID and selected language are required.' });
      }

      let profile = await userProfileModel.findOne({ userId });

      if (!profile) {
          profile = new userProfileModel({ userId, language: selectedLanguage });
      } else {
          profile.language = selectedLanguage;
      }

      await profile.save();
      res.status(200).json({ message: 'Language saved successfully', profile });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
  }
};