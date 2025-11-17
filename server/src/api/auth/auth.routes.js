const express = require('express');
const passport = require('passport');
const authController = require('./auth.controller');
const validate = require('../../middleware/validate.middleware');
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/verify-email', authController.verifyEmail);
// Get current user
const { protect } = require('../../middleware/auth.middleware');
router.get('/me', protect, authController.getMe);
router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  authController.forgotPassword
);
router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  authController.resetPassword
);

// Google OAuth
router.get(
  '/google',
  (req, res, next) => {
    // Get role from query parameter (USER or DONOR)
    const role = req.query.role || 'USER';
    
    // Construct and log the authorization URL for debugging
    try {
      const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        redirect_uri: process.env.GOOGLE_CALLBACK_URL || '',
        response_type: 'code',
        scope: 'profile email',
        access_type: 'offline',
        prompt: 'consent',
      });
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      console.log('Starting Google OAuth with role:', role);
      console.log('Authorization URL:', authUrl);
    } catch (err) {
      console.error('Error constructing Google auth URL for debug:', err);
    }
    
    // Pass role through state parameter
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      state: role
    })(req, res, next);
  }
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  authController.googleCallback
);

// LinkedIn OAuth
router.get(
  '/linkedin',
  (req, res, next) => {
    // Get role from query parameter (USER or DONOR)
    const role = req.query.role || 'USER';
    
    console.log('Starting LinkedIn OAuth with role:', role);
    
    // Pass role through state parameter
    passport.authenticate('linkedin', { 
      scope: ['openid', 'profile', 'email'], // Updated to OIDC scopes
      state: role
    })(req, res, next);
  }
);
router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', { session: false, failureRedirect: '/login' }),
  authController.linkedinCallback
);

module.exports = router;