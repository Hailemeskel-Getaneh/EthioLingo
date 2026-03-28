const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz } = require('../controllers/quizController');

router.get('/lessons/:id/quiz', getQuiz);
router.post('/lessons/:id/quiz', submitQuiz);

module.exports = router;
// Quiz route rule variant 1
// Quiz route rule variant 2
// Quiz route rule variant 3
// Quiz route rule variant 4
