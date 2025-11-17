const express = require('express');
const webhookController = require('./webhook.controller');

const router = express.Router();

router.post(
  '/payment-success',
  // Use express.raw to get the raw body for signature verification
  express.raw({ type: 'application/json' }),
  webhookController.handleStripeEvent
);

module.exports = router;