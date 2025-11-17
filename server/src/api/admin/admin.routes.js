const express = require('express');
const adminController = require('./admin.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const { verifyProjectSchema } = require('./admin.validation');

const router = express.Router();

// All admin routes require authentication and ADMIN role
router.use(protect);
router.use(restrictTo('ADMIN'));

// Get all projects
router.get('/projects', adminController.getAllProjects);

// Verify/approve projects
router.patch(
  '/projects/user/:id/verify',
  validate(verifyProjectSchema),
  adminController.verifyUserProject
);

router.patch(
  '/projects/donor/:id/verify',
  validate(verifyProjectSchema),
  adminController.verifyDonorProject
);

// Get all users and donors
router.get('/users', adminController.getAllUsers);
router.get('/donors', adminController.getAllDonors);

module.exports = router;
