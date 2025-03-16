import express from 'express';
import {getUserProfile} from '../controllers/userProfileController.js';
import authMiddleware from'../middleware/authMiddleware.js'

const router=  express.Router();

router.get('/',authMiddleware,getUserProfile)

export default router;