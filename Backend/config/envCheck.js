/**
 * Startup Environment Variable Checker
 */
const requiredEnvVars = ['PORT'];

const checkEnv = () => {
  const missing = requiredEnvVars.filter((varName) => !process.env[varName]);
  if (missing.length > 0) {
    console.warn(`[Config Warning] Missing recommended environment variables: ${missing.join(', ')}`);
  } else {
    console.log('[Config] All required environment variables loaded successfully.');
  }
};

module.exports = checkEnv;
