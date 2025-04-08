import express from 'express';
import {getUserProfile, createProfile} from '../controllers/userProfileController.js';



const router=  express.Router();


router.get("/:userId", getUserProfile); 
// router.post("/:userId", updateUserProfile); 
router.post('/create-profile', createProfile);






export default router;