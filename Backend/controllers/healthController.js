/**
 * System Health Controller
 */
const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
};

module.exports = { getHealthStatus };
