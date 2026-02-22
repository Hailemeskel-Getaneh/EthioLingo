const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const checkEnv = require('./config/envCheck');
const healthRoutes = require('./routes/healthRoutes');

checkEnv();

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use('/api', healthRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EthioLingo API Server', status: 'running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[EthioLingo] Backend Server running on port ${PORT}`);
  });
}

module.exports = app;
