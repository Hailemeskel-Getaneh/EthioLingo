const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz } = require('../controllers/quizController');

router.get('/lessons/:id/quiz', getQuiz);
router.post('/lessons/:id/quiz', submitQuiz);

module.exports = router;
