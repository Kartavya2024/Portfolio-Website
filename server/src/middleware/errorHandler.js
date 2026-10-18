// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log error safely without leaking sensitive information
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  // Mongoose validation error handling
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: messages.join('. '),
      details: messages,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate field value entered.',
    });
  }

  // CastError (e.g. invalid MongoDB ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Resource not found with id of ${err.value}`,
    });
  }

  // Payload too large error
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      error: 'Payload size exceeds the allowable limit (50KB).',
    });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
