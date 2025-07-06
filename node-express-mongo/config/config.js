require('dotenv').config(); // Loads variables from .env if present

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  // Add other configs as needed
};