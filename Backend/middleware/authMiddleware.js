import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); 
    const decoded = jwt.verify(token, 'your_secret_key'); 
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ message: 'Authorization failed' });
  }
};

export default authMiddleware;

