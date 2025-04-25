import express from 'express';
import {getUserProfile, createProfile,updateUserProfile} from '../controllers/userProfileController.js';



const router=  express.Router();


router.get("/:userId", getUserProfile); 
router.put('/update-profile/:userId', updateUserProfile);
router.post('/create-profile', createProfile);






export default router;