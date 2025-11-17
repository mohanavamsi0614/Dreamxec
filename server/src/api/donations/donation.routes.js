const express = require('express');
const donationController = require('./donation.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const { createPaymentIntentSchema, makeDonationSchema } = require('./donation.validation');

const router = express.Router();

router.use(protect);

// DONOR routes
router.post(
  '/create-payment-intent',
  restrictTo('DONOR'),
  validate(createPaymentIntentSchema),
  donationController.createPaymentIntent
);

router.post(
  '/',
  restrictTo('DONOR'),
  validate(makeDonationSchema),
  donationController.makeDonation
);

router.get(
  '/my',
  restrictTo('DONOR'),
  donationController.getMyDonations
);

// USER or ADMIN: Get donations for a specific project
router.get(
  '/project/:projectId',
  donationController.getProjectDonations
);

module.exports = router;