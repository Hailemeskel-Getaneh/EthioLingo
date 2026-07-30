/**
 * Async Route Handler Wrapper
 * Catches rejected promises in async route handlers and forwards them to next()
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
