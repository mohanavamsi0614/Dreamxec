const express = require('express');
const projectController = require('./project.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const {
  createProjectSchema,
  updateProjectSchema,
  verifyProjectSchema,
} = require('./project.validation');

const router = express.Router();

// PUBLIC routes (no authentication required)
router.get('/public', projectController.getPublicProjects);
router.get('/:id', projectController.getProject);

// Protected routes (authentication required)
router.use(protect);

// User's own projects
router.get('/my-projects', projectController.getMyProjects);

// Create a new project
router.post(
  '/',
  restrictTo('USER'),
  validate(createProjectSchema),
  projectController.createProject
);

// Update/delete user's own project
router
  .route('/:id/my-project')
  .put(
    restrictTo('USER'),
    validate(updateProjectSchema),
    projectController.updateMyProject
  )
  .delete(restrictTo('USER'), projectController.deleteMyProject);

// ADMIN routes
router.get(
  '/admin/all',
  restrictTo('ADMIN'),
  projectController.getAllProjectsForAdmin
);

router.patch(
  '/:id/verify',
  restrictTo('ADMIN'),
  validate(verifyProjectSchema),
  projectController.verifyProject
);

module.exports = router;