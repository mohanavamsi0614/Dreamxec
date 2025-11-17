const express = require('express');
const userProjectController = require('./user-project.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const {
  createUserProjectSchema,
  updateUserProjectSchema,
} = require('./user-project.validation');

const router = express.Router();

// PUBLIC routes (no authentication required)
router.get('/public', userProjectController.getPublicUserProjects);

// Protected routes (authentication required)
router.use(protect);

// USER routes - /my must come before /:id
router.get('/my', restrictTo('USER'), userProjectController.getMyUserProjects);

// Public route for specific project (but after /my to avoid conflicts)
router.get('/:id', userProjectController.getUserProject);

router.post(
  '/',
  restrictTo('USER'),
  validate(createUserProjectSchema),
  userProjectController.createUserProject
);

router.put(
  '/:id',
  restrictTo('USER'),
  validate(updateUserProjectSchema),
  userProjectController.updateUserProject
);

router.delete(
  '/:id',
  restrictTo('USER'),
  userProjectController.deleteUserProject
);

// This must come after /my to avoid conflicts
router.get('/:id', userProjectController.getUserProject);

module.exports = router;
