const AppError = require('../utils/AppError');

const handlePrismaError = (err) => {
  switch (err.code) {
    case 'P2002':
      // Unique constraint violation
      const field = err.meta.target[0];
      return new AppError(`A record with this ${field} already exists.`, 400);
    case 'P2025':
      // Record to update/delete not found
      return new AppError('The requested record was not found.', 404);
    default:
      // Generic Prisma error
      return new AppError('A database error occurred.', 500);
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  console.error('Error caught in middleware:', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Always send error response regardless of NODE_ENV
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};