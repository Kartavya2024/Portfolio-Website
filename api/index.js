const app = require('../server/src/app');
const { connectDB } = require('../server/src/config/db');

// Lazy DB connection for Vercel Serverless Function invocations
app.use(async (req, res, next) => {
  if (process.env.MONGODB_URI) {
    try {
      await connectDB();
    } catch (err) {
      console.warn('MongoDB connection note:', err.message);
    }
  }
  next();
});

module.exports = app;
