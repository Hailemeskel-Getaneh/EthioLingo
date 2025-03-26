import express from 'express';
import {getUserProfile, updateUserProfile, createProfile} from '../controllers/userProfileController.js';
import authMiddleware from'../middleware/authMiddleware.js'


const router=  express.Router();

router.get('/',authMiddleware,getUserProfile)
router.get("/:userId", getUserProfile); 
router.post("/:userId", updateUserProfile); 
router.post('/api/user-profile/create-profile/:userId', createProfile);





export default router;