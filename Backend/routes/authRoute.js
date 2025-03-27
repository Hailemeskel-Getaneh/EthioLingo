import express from 'express';
import { signup, refreshToken, login } from '../controllers/authController.js';
import authMiddleware from'../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/refresh_token',refreshToken)
router.post('/test',authMiddleware)


export default router;
