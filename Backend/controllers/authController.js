/**
 * Auth controller handlers
 */
const register = (req, res) => res.json({ success: true, message: 'User registered' });
const login = (req, res) => res.json({ success: true, token: 'token' });

module.exports = { register, login };
// Controller update pass 1
// Controller update pass 2
// Controller update pass 3
// Controller update pass 4
// Controller update pass 5
// Controller update pass 6
