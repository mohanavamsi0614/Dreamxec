const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const AppError = require('./src/utils/AppError');
const globalErrorHandler = require('./src/middleware/error.middleware');

// Load environment variables
dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;
console.log("CLIENT_URL =", CLIENT_URL);


// Route imports
const authRoutes = require('./src/api/auth/auth.routes');
const userProjectRoutes = require('./src/api/user-projects/user-project.routes');
const donorProjectRoutes = require('./src/api/donor-projects/donor-project.routes');
const userRoutes = require('./src/api/users/user.routes');
const donationRoutes = require('./src/api/donations/donation.routes');
const adminRoutes = require('./src/api/admin/admin.routes');
const webhookRoutes = require('./src/api/webhook/webhook.routes');
const applicationRoutes = require('./src/api/applications/application.routes');

// Passport configuration
require('./src/config/passport');

const app = express();

// Middlewares
app.use(cors());
app.use(passport.initialize());

// Special route for Stripe webhook before express.json()
app.use('/api/webhooks', webhookRoutes);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

app.get('/', (req, res) => {
  // redirect to frontend client if configured, otherwise show JSON
  if (CLIENT_URL) return res.redirect(CLIENT_URL);
  return res.json({ service: 'project-x backend', status: 'running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user-projects', userProjectRoutes);
app.use('/api/donor-projects', donorProjectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/applications', applicationRoutes);


// Handle undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});