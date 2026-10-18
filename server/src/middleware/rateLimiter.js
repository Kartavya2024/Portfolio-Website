const rateLimit = require('express-rate-limit');

// Rate limiter for contact form submissions: 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact submissions per windowMs
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    success: false,
    error: 'Too many contact submissions from this IP address. Please wait 15 minutes before trying again.',
  },
  skip: (req) => process.env.NODE_ENV === 'test', // Skip rate limiting during test runs
});

module.exports = { contactLimiter };
