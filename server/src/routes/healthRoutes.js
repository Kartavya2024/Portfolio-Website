const express = require('express');
const router = express.Router();
const { isDbConnected } = require('../config/db');

/**
 * @route   GET /api/health
 * @desc    Check API and database health status
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Kartavya Garhwal Portfolio API is operational',
    timestamp: new Date().toISOString(),
    database: {
      connected: isDbConnected(),
      status: isDbConnected() ? 'connected' : 'disconnected',
    },
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
