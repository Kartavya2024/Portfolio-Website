const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const { connectDB } = require('./config/db');
const { generateBothResumes } = require('./utils/generateResumes');

const PORT = process.env.PORT || 5001;

// Initialize Server
const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();

    // 2. Pre-generate or verify Resume files exist
    try {
      await generateBothResumes();
    } catch (resumeErr) {
      console.warn('⚠️ Note on resume pre-generation:', resumeErr.message);
    }

    // 3. Start Express HTTP Server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Portfolio Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📄 PDF Resume: http://localhost:${PORT}/api/resume/pdf`);
      console.log(`📄 DOCX Resume: http://localhost:${PORT}/api/resume/docx`);
    });

    // Handle Unhandled Promise Rejections
    process.on('unhandledRejection', (err) => {
      console.error('💥 Unhandled Rejection:', err.message);
      // Keep server running in development, or gracefully exit
    });

    // Handle termination signals
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server terminated.');
      });
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
