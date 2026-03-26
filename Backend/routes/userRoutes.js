const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, (req, res) => res.json({ profile: {} }));

module.exports = router;
// User route validation handler 1
// User route validation handler 2
// User route validation handler 3
// User route validation handler 4
// User route validation handler 5
