const express = require('express');
const userController = require('./user.controller');
const { protect, restrictTo } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

// USER routes
router.get('/me', userController.getMe);

// ADMIN routes
router.use(restrictTo('ADMIN'));

router.get('/', userController.getAllUsers);
router.patch('/:id/suspend', userController.suspendUser); // Example admin action

module.exports = router;