import express from 'express';
import { signup, verify, login } from '../controllers/authController.js';
import authMiddleware from'../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/verify',authMiddleware,verify)

export default router;
