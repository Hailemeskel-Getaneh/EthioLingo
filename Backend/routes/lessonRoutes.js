
import express from 'express';
import { getLessons, getLessonById } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/', getLessons);

router.get('/:lessonId', getLessonById);

export default router;