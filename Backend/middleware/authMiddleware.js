import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); 
    const decoded = jwt.verify(token,ACCESS_TOKEN_SECRET)
    if (decoded){
      req.body.userId = decoded.userId;
      req.body.status = "Authorized";
      console.log(decoded.userId)
    }
    else{
      req.body.status = "Unauthorized"
    }
    next()
    
  } catch (error) {
    return res.status(401).json({ message: 'Authorization failed' });
  }
};

export default authMiddleware;

