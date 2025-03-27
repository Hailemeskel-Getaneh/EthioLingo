import express from 'express';
import {getUserProfile} from '../controllers/userProfileController.js';
import authMiddleware from'../middleware/authMiddleware.js'
import { saveLanguage } from '../controllers/userProfileController.js'

const router=  express.Router();

// router.get('/',authMiddleware,getUserProfile)
// router.get('/saveLanguge',saveLanguage)


export default router;