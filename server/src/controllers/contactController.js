const mongoose = require('mongoose');
const Contact = require('../models/Contact');

/**
 * @desc    Submit a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, message, website, _hp } = req.body;

    // Honeypot anti-spam check: if hidden honeypot fields are filled, silently drop or reject
    if (website || _hp) {
      console.warn('⚠️ Honeypot triggered: Bot detected and submission rejected.');
      return res.status(400).json({
        success: false,
        error: 'Spam submission detected.',
      });
    }

    // Input sanitization & validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name.',
      });
    }

    if (name.trim().length < 2 || name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name must be between 2 and 100 characters long.',
      });
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your email address.',
      });
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address (e.g. user@example.com).',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a message.',
      });
    }

    if (message.trim().length < 10 || message.trim().length > 2000) {
      return res.status(400).json({
        success: false,
        error: 'Message must be between 10 and 2000 characters long.',
      });
    }

    // Check database connection state
    if (mongoose.connection.readyState !== 1) {
      console.error(
        '⚠️ MongoDB is not connected (readyState !== 1). Contact submission cannot be persisted.'
      );
      return res.status(503).json({
        success: false,
        error:
          'Database connection is unavailable. To store messages in MongoDB, configure a valid MONGODB_URI in server/.env or MongoDB Atlas. You can also connect directly via LinkedIn or email.',
      });
    }

    // Persist to MongoDB
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    const savedContact = await contact.save();

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been saved successfully.',
      data: {
        id: savedContact._id,
        name: savedContact.name,
        email: savedContact.email,
        createdAt: savedContact.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactMessage,
};
