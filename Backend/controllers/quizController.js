/**
 * Quiz data controller
 */
const getQuiz = (req, res) => res.json({ questions: [] });
const submitQuiz = (req, res) => res.json({ score: 100 });

module.exports = { getQuiz, submitQuiz };
// Quiz scoring adjustment rule 1
