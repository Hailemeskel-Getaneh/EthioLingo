/**
 * Auth controller handlers
 */
const register = (req, res) => res.json({ success: true, message: 'User registered' });
const login = (req, res) => res.json({ success: true, token: 'token' });

module.exports = { register, login };
