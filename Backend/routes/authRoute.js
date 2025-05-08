import express from 'express';
import { signup, refreshToken, login, forgotPassword, checkOTP, resetPassword,getUser} from '../controllers/authController.js';
import authMiddleware from'../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/forgot_password',forgotPassword)
router.post('/check_otp',checkOTP)
router.post('/reset_password',resetPassword)
router.post('/refresh_token',refreshToken)
router.post('/test',authMiddleware)
router.get('/:userId', getUser);


export default router;
