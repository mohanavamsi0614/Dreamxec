const express = require('express');
const donorProjectController = require('./donor-project.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const {
  createDonorProjectSchema,
  updateDonorProjectSchema,
} = require('./donor-project.validation');

const router = express.Router();

// PUBLIC routes (no authentication required)
router.get('/public', donorProjectController.getPublicDonorProjects);

// Protected routes (authentication required)
router.use(protect);

// DONOR routes - /my must come before /:id to avoid treating 'my' as an id
router.get('/my', restrictTo('DONOR'), donorProjectController.getMyDonorProjects);

router.post(
  '/',
  restrictTo('DONOR'),
  validate(createDonorProjectSchema),
  donorProjectController.createDonorProject
);

router.put(
  '/:id',
  restrictTo('DONOR'),
  validate(updateDonorProjectSchema),
  donorProjectController.updateDonorProject
);

router.delete(
  '/:id',
  restrictTo('DONOR'),
  donorProjectController.deleteDonorProject
);

// This must come after /my to avoid conflicts
router.get('/:id', donorProjectController.getDonorProject);

module.exports = router;
