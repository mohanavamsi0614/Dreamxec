const prisma = require('../../config/prisma');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const sendEmail = require('../../services/email.service');

// USER: Create a user project
exports.createUserProject = catchAsync(async (req, res, next) => {
  const { title, description, companyName, skillsRequired, timeline, goalAmount, imageUrl } = req.body;

  const userProject = await prisma.userProject.create({
    data: {
      title,
      description,
      companyName: companyName || null,
      skillsRequired: skillsRequired || [],
      timeline: timeline || null,
      goalAmount,
      imageUrl: imageUrl || null,
      userId: req.user.id,
    },
  });

  res.status(201).json({ status: 'success', data: { userProject } });
});

// USER: Update their own user project
exports.updateUserProject = catchAsync(async (req, res, next) => {
  const userProject = await prisma.userProject.findUnique({
    where: { id: req.params.id },
  });

  if (!userProject) {
    return next(new AppError('User project not found', 404));
  }

  if (userProject.userId !== req.user.id) {
    return next(
      new AppError('You are not authorized to edit this project', 403)
    );
  }

  if (userProject.status !== 'PENDING' && userProject.status !== 'REJECTED') {
    return next(
      new AppError('Only PENDING or REJECTED projects can be updated.', 400)
    );
  }

  const updatedUserProject = await prisma.userProject.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.status(200).json({ status: 'success', data: { userProject: updatedUserProject } });
});

// USER: Delete their own user project
exports.deleteUserProject = catchAsync(async (req, res, next) => {
  const userProject = await prisma.userProject.findUnique({
    where: { id: req.params.id },
  });

  if (!userProject) {
    return next(new AppError('User project not found', 404));
  }

  if (userProject.userId !== req.user.id) {
    return next(
      new AppError('You are not authorized to delete this project', 403)
    );
  }

  if (userProject.status !== 'PENDING' && userProject.status !== 'REJECTED') {
    return next(
      new AppError('Only PENDING or REJECTED projects can be deleted.', 400)
    );
  }

  await prisma.userProject.delete({ where: { id: req.params.id } });

  res.status(204).json({ status: 'success', data: null });
});

// PUBLIC: Get a single user project's details
exports.getUserProject = catchAsync(async (req, res, next) => {
  const userProject = await prisma.userProject.findUnique({
    where: { id: req.params.id },
    include: { 
      user: { select: { id: true, name: true } },
      donations: { 
        select: { 
          amount: true, 
          createdAt: true,
          donor: { select: { name: true } },
          anonymous: true
        } 
      }
    },
  });

  if (!userProject) {
    return next(new AppError('User project not found', 404));
  }

  res.status(200).json({ status: 'success', data: { userProject } });
});

// PUBLIC: Get all approved user projects
exports.getPublicUserProjects = catchAsync(async (req, res, next) => {
  const userProjects = await prisma.userProject.findMany({
    where: { status: 'APPROVED' },
    include: { 
      user: { select: { id: true, name: true } },
      donations: { select: { amount: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({ 
    status: 'success', 
    results: userProjects.length,
    data: { userProjects } 
  });
});

// USER: Get all of their own user projects
exports.getMyUserProjects = catchAsync(async (req, res, next) => {
  const userProjects = await prisma.userProject.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      user: {
        select: { name: true, id: true },
      },
      donations: {
        select: { amount: true }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.status(200).json({
    status: 'success',
    results: userProjects.length,
    data: { userProjects },
  });
});
