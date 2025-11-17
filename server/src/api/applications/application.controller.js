const prisma = require('../../config/prisma');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

// STUDENT: Apply to a donor project
exports.applyToDonorProject = catchAsync(async (req, res, next) => {
  const { donorProjectId, coverLetter, skills } = req.body;

  // Check if donor project exists and is approved
  const donorProject = await prisma.donorProject.findUnique({
    where: { id: donorProjectId },
  });

  if (!donorProject) {
    return next(new AppError('Donor project not found', 404));
  }

  if (donorProject.status !== 'APPROVED') {
    return next(new AppError('You can only apply to approved projects', 400));
  }

  // Check if already applied
  const existingApplication = await prisma.application.findUnique({
    where: {
      userId_donorProjectId: {
        userId: req.user.id,
        donorProjectId,
      },
    },
  });

  if (existingApplication) {
    return next(new AppError('You have already applied to this project', 400));
  }

  // Create application
  const application = await prisma.application.create({
    data: {
      userId: req.user.id,
      donorProjectId,
      coverLetter,
      skills: skills || [],
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      donorProject: {
        select: { id: true, title: true, organization: true },
      },
    },
  });

  res.status(201).json({
    status: 'success',
    message: 'Application submitted successfully',
    data: { application },
  });
});

// STUDENT: Get all my applications
exports.getMyApplications = catchAsync(async (req, res, next) => {
  const applications = await prisma.application.findMany({
    where: { userId: req.user.id },
    include: {
      donorProject: {
        select: {
          id: true,
          title: true,
          description: true,
          organization: true,
          timeline: true,
          totalBudget: true,
          status: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: { applications },
  });
});

// DONOR: Get all applications for my projects
exports.getApplicationsForMyProjects = catchAsync(async (req, res, next) => {
  const applications = await prisma.application.findMany({
    where: {
      donorProject: {
        donorId: req.user.id,
      }
      // Note: Since we cleaned up null userIds, we can rely on the include to work
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      donorProject: {
        select: { id: true, title: true, organization: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Filter out any applications where user is null (extra safety)
  const validApplications = applications.filter(app => app.user !== null);

  res.status(200).json({
    status: 'success',
    results: validApplications.length,
    data: { applications: validApplications },
  });
});

// DONOR: Get applications for a specific project
exports.getApplicationsForProject = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;

  // Verify the project belongs to the donor
  const donorProject = await prisma.donorProject.findUnique({
    where: { id: projectId },
  });

  if (!donorProject) {
    return next(new AppError('Donor project not found', 404));
  }

  if (donorProject.donorId !== req.user.id) {
    return next(new AppError('You can only view applications for your own projects', 403));
  }

  const applications = await prisma.application.findMany({
    where: { 
      donorProjectId: projectId
      // Note: Since we cleaned up null userIds, we can rely on the include to work
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  // Filter out any applications where user is null (extra safety)
  const validApplications = applications.filter(app => app.user !== null);

  res.status(200).json({
    status: 'success',
    results: validApplications.length,
    data: { applications: validApplications },
  });
});

// DONOR: Accept or reject an application
exports.updateApplicationStatus = catchAsync(async (req, res, next) => {
  const { applicationId } = req.params;
  const { status, rejectionReason } = req.body;

  if (!['ACCEPTED', 'REJECTED'].includes(status)) {
    return next(new AppError('Status must be either ACCEPTED or REJECTED', 400));
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { donorProject: true, user: { select: { email: true, name: true } } },
  });

  if (!application) {
    return next(new AppError('Application not found', 404));
  }

  // Verify the project belongs to the donor
  if (application.donorProject.donorId !== req.user.id) {
    return next(new AppError('You can only update applications for your own projects', 403));
  }

  // Update application
  const updateData = { status };
  if (status === 'REJECTED' && rejectionReason) {
    updateData.rejectionReason = rejectionReason;
  } else if (status === 'ACCEPTED') {
    updateData.rejectionReason = null;
  }

  const updatedApplication = await prisma.application.update({
    where: { id: applicationId },
    data: updateData,
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      donorProject: {
        select: { id: true, title: true, organization: true },
      },
    },
  });

  // TODO: Send email notification to the student
  // You can use the email service here to notify the student

  res.status(200).json({
    status: 'success',
    data: { application: updatedApplication },
  });
});

// STUDENT: Withdraw application (delete)
exports.withdrawApplication = catchAsync(async (req, res, next) => {
  const { applicationId } = req.params;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    return next(new AppError('Application not found', 404));
  }

  if (application.userId !== req.user.id) {
    return next(new AppError('You can only withdraw your own applications', 403));
  }

  if (application.status !== 'PENDING') {
    return next(new AppError('You can only withdraw pending applications', 400));
  }

  await prisma.application.delete({ where: { id: applicationId } });

  res.status(204).json({ status: 'success', data: null });
});
