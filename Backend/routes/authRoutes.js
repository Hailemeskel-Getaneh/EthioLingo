const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
// Routing variation 1
// Routing variation 2
// Routing variation 3
// Routing variation 4
// Routing variation 5
// Routing variation 6
// Routing variation 7
// Routing variation 8
// Routing variation 9
// Routing variation 10
// Routing variation 11
