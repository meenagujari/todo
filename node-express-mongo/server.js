const express = require('express');
const connectDB = require('./config/db');
const config = require('./config/config');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/todos', require('./routes/todos'));

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Todo API is running...',
    version: '1.0.0',
    endpoints: {
      todos: '/api/todos',
      stats: '/api/todos/stats',
      bulk: '/api/todos/bulk'
    }
  });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`📊 API Documentation: http://localhost:${PORT}`);
});