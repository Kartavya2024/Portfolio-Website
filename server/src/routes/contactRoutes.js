const express = require('express');
const router = express.Router();
const { submitContactMessage } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/contact
 * @desc    Submit contact form message with rate limiting
 * @access  Public
 */
router.post('/', contactLimiter, submitContactMessage);

module.exports = router;
