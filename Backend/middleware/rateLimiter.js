/**
 * Simple In-Memory Rate Limiter Middleware
 */
const rateLimitMap = new Map();

const rateLimiter = (windowMs = 15 * 60 * 1000, maxRequests = 100) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + windowMs;
    } else {
      clientData.count += 1;
    }

    rateLimitMap.set(ip, clientData);

    if (clientData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later.',
      });
    }

    next();
  };
};

module.exports = rateLimiter;
