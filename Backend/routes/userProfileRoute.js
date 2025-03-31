import express from 'express';
import {getUserProfile, createProfile} from '../controllers/userProfileController.js';



const router=  express.Router();


router.get("/:userId", getUserProfile); 
// router.post("/:userId", updateUserProfile); 
router.post('/create-profile/:userId', createProfile);





export default router;