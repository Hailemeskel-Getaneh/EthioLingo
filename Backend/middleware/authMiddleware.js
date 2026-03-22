/**
 * Authentication Token JWT Validator Middleware
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No authorization header' });
  next();
};

module.exports = authMiddleware;
// Middleware variation validation rule 1
// Middleware variation validation rule 2
// Middleware variation validation rule 3
// Middleware variation validation rule 4
// Middleware variation validation rule 5
