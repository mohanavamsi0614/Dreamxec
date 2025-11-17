const prisma = require('../../config/prisma');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');
const sendEmail = require('../../services/email.service');

// ADMIN: Get all projects (both user and donor projects)
exports.getAllProjects = catchAsync(async (req, res, next) => {
  const userProjects = await prisma.userProject.findMany({
    include: { 
      user: { select: { id: true, name: true, email: true } },
      donations: { select: { amount: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const donorProjects = await prisma.donorProject.findMany({
    include: { 
      donor: { select: { id: true, name: true, email: true, organizationName: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({ 
    status: 'success', 
    data: { 
      userProjects: {
        results: userProjects.length,
        projects: userProjects
      },
      donorProjects: {
        results: donorProjects.length,
        projects: donorProjects
      }
    } 
  });
});

// ADMIN: Approve or reject a user project
exports.verifyUserProject = catchAsync(async (req, res, next) => {
  const { status, reason } = req.body;
  
  if (!['APPROVED', 'REJECTED'].includes(status)) {
    return next(new AppError('Status must be either APPROVED or REJECTED', 400));
  }

  const userProject = await prisma.userProject.findUnique({
    where: { id: req.params.id },
    include: { user: { select: { email: true, name: true } } }
  });

  if (!userProject) {
    return next(new AppError('User project not found', 404));
  }

  // Update status and save rejection reason if rejected
  const updateData = { status };
  if (status === 'REJECTED' && reason) {
    updateData.rejectionReason = reason;
  } else if (status === 'APPROVED') {
    updateData.rejectionReason = null; // Clear any previous rejection reason
  }

  const updatedUserProject = await prisma.userProject.update({
    where: { id: req.params.id },
    data: updateData
  });

  // Send email notification to project owner
  if (userProject.user && userProject.user.email) {
    let rejectionDetails = 'Please review your project details and resubmit if needed.';
    if (reason) {
      rejectionDetails = `Reason: ${reason}\n\nPlease review the feedback, update your project, and resubmit.`;
    }
    const approvalMessage = 'Congratulations! Your project is now live and accepting donations.';
    
    const message = `Dear ${userProject.user.name},\n\nYour project "${userProject.title}" has been ${status.toLowerCase()}.\n\n${status === 'APPROVED' ? approvalMessage : rejectionDetails}\n\nBest regards,\nThe Platform Team`;
    
    try {
      await sendEmail({
        email: userProject.user.email,
        subject: `Your Project "${userProject.title}" has been ${status}`,
        message
      });
    } catch (err) {
      console.error('Email sending error:', err);
    }
  }

  res.status(200).json({ 
    status: 'success', 
    data: { userProject: updatedUserProject } 
  });
});

// ADMIN: Approve or reject a donor project
exports.verifyDonorProject = catchAsync(async (req, res, next) => {
  const { status, reason } = req.body;
  
  if (!['APPROVED', 'REJECTED'].includes(status)) {
    return next(new AppError('Status must be either APPROVED or REJECTED', 400));
  }

  const donorProject = await prisma.donorProject.findUnique({
    where: { id: req.params.id },
    include: { donor: { select: { email: true, name: true } } }
  });

  if (!donorProject) {
    return next(new AppError('Donor project not found', 404));
  }

  // Update status and save rejection reason if rejected
  const updateData = { status };
  if (status === 'REJECTED' && reason) {
    updateData.rejectionReason = reason;
  } else if (status === 'APPROVED') {
    updateData.rejectionReason = null; // Clear any previous rejection reason
  }

  const updatedDonorProject = await prisma.donorProject.update({
    where: { id: req.params.id },
    data: updateData
  });

  // Send email notification to donor
  if (donorProject.donor && donorProject.donor.email) {
    let rejectionDetails = 'Please review your project details and resubmit if needed.';
    if (reason) {
      rejectionDetails = `Reason: ${reason}\n\nPlease review the feedback, update your project, and resubmit.`;
    }
    const approvalMessage = 'Congratulations! Your project is now live.';
    
    const message = `Dear ${donorProject.donor.name},\n\nYour project "${donorProject.title}" has been ${status.toLowerCase()}.\n\n${status === 'APPROVED' ? approvalMessage : rejectionDetails}\n\nBest regards,\nThe Platform Team`;
    
    try {
      await sendEmail({
        email: donorProject.donor.email,
        subject: `Your Project "${donorProject.title}" has been ${status}`,
        message
      });
    } catch (err) {
      console.error('Email sending error:', err);
    }
  }

  res.status(200).json({ 
    status: 'success', 
    data: { donorProject: updatedDonorProject } 
  });
});

// ADMIN: Get all registered users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          userProjects: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
});

// ADMIN: Get all registered donors
exports.getAllDonors = catchAsync(async (req, res, next) => {
  const donors = await prisma.donor.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      organizationName: true,
      verified: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          donations: true,
          donorProjects: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({
    status: 'success',
    results: donors.length,
    data: { donors }
  });
});
