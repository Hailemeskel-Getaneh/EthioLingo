import express from 'express';
import { signup, verify } from '../controllers/authController.js';
import authMiddleware from'../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup',signup,authMiddleware)
router.post('/verify',verify,authMiddleware)

export default router;
