const prisma = require('../../config/prisma');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

// DONOR: Create a donor project
exports.createDonorProject = catchAsync(async (req, res, next) => {
  const { title, description, organization, skillsRequired, timeline, totalBudget, imageUrl } = req.body;

  const donorProject = await prisma.donorProject.create({
    data: {
      title,
      description,
      organization: organization || null,
      skillsRequired: skillsRequired || [],
      timeline: timeline || null,
      totalBudget,
      imageUrl: imageUrl || null,
      donorId: req.user.id,
      status: 'PENDING', // Requires admin verification
    },
  });

  res.status(201).json({ 
    status: 'success', 
    message: 'Donor project created successfully. Awaiting admin approval.',
    data: { donorProject } 
  });
});

// DONOR: Update their own donor project
exports.updateDonorProject = catchAsync(async (req, res, next) => {
  const donorProject = await prisma.donorProject.findUnique({
    where: { id: req.params.id },
  });

  if (!donorProject) {
    return next(new AppError('Donor project not found', 404));
  }

  if (donorProject.donorId !== req.user.id) {
    return next(
      new AppError('You are not authorized to edit this project', 403)
    );
  }

  if (donorProject.status !== 'PENDING' && donorProject.status !== 'REJECTED') {
    return next(
      new AppError('Only PENDING or REJECTED projects can be updated.', 400)
    );
  }

  const updatedDonorProject = await prisma.donorProject.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.status(200).json({ status: 'success', data: { donorProject: updatedDonorProject } });
});

// DONOR: Delete their own donor project
exports.deleteDonorProject = catchAsync(async (req, res, next) => {
  const donorProject = await prisma.donorProject.findUnique({
    where: { id: req.params.id },
  });

  if (!donorProject) {
    return next(new AppError('Donor project not found', 404));
  }

  if (donorProject.donorId !== req.user.id) {
    return next(
      new AppError('You are not authorized to delete this project', 403)
    );
  }

  if (donorProject.status !== 'PENDING' && donorProject.status !== 'REJECTED') {
    return next(
      new AppError('Only PENDING or REJECTED projects can be deleted.', 400)
    );
  }

  await prisma.donorProject.delete({ where: { id: req.params.id } });

  res.status(204).json({ status: 'success', data: null });
});

// PUBLIC: Get a single donor project's details
exports.getDonorProject = catchAsync(async (req, res, next) => {
  const donorProject = await prisma.donorProject.findUnique({
    where: { id: req.params.id },
    include: { donor: { select: { id: true, name: true, organizationName: true } } },
  });

  if (!donorProject) {
    return next(new AppError('Donor project not found', 404));
  }

  // Only show APPROVED projects to public (unless owner is viewing)
  // Note: req.user will be undefined for unauthenticated requests
  if (donorProject.status !== 'APPROVED') {
    // Allow owner and admin to view their own pending/rejected projects
    if (!req.user || (req.user.id !== donorProject.donorId && req.user.role !== 'ADMIN')) {
      return next(new AppError('Donor project not found', 404));
    }
  }

  res.status(200).json({ status: 'success', data: { donorProject } });
});

// PUBLIC: Get all approved donor projects
exports.getPublicDonorProjects = catchAsync(async (req, res, next) => {
  const donorProjects = await prisma.donorProject.findMany({
    where: { status: 'APPROVED' },
    include: { 
      donor: { select: { id: true, name: true, organizationName: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({ 
    status: 'success', 
    results: donorProjects.length,
    data: { donorProjects } 
  });
});

// DONOR: Get all of their own donor projects
exports.getMyDonorProjects = catchAsync(async (req, res, next) => {
  const donorProjects = await prisma.donorProject.findMany({
    where: {
      donorId: req.user.id,
    },
    include: {
      donor: {
        select: { name: true, id: true, organizationName: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.status(200).json({
    status: 'success',
    results: donorProjects.length,
    data: { donorProjects },
  });
});
