const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../../config/prisma');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/AppError');

// DONOR: Create a payment intent for donation
exports.createPaymentIntent = catchAsync(async (req, res, next) => {
  const { amount, projectId } = req.body;
  const donorId = req.user.id;

  // 1. Check if the project exists and is approved
  const project = await prisma.userProject.findUnique({ where: { id: projectId } });
  if (!project || project.status !== 'APPROVED') {
    return next(new AppError('Project not found or not open for donations.', 404));
  }
  
  // 2. Amount must be in cents for Stripe
  const amountInCents = Math.round(amount * 100);

  // 3. Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd', // Or your preferred currency
    metadata: {
      projectId,
      donorId,
    },
  });

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// DONOR: Make a donation (direct donation without Stripe for MVP)
exports.makeDonation = catchAsync(async (req, res, next) => {
  const { amount, userProjectId, message, anonymous } = req.body;
  const donorId = req.user.id;

  // Check if the user project exists and is approved
  const userProject = await prisma.userProject.findUnique({ 
    where: { id: userProjectId } 
  });
  
  if (!userProject || userProject.status !== 'APPROVED') {
    return next(new AppError('Project not found or not open for donations.', 404));
  }

  // Create donation record
  const donation = await prisma.donation.create({
    data: {
      amount,
      message: message || null,
      anonymous: anonymous || false,
      paymentStatus: 'completed', // For MVP, assume immediate success
      donorId,
      userProjectId,
    },
    include: {
      donor: { select: { name: true, email: true } },
      userProject: { select: { title: true } }
    }
  });

  // Update project amountRaised
  await prisma.userProject.update({
    where: { id: userProjectId },
    data: {
      amountRaised: {
        increment: amount
      }
    }
  });

  res.status(201).json({ 
    status: 'success', 
    data: { donation } 
  });
});

// DONOR: Get all donations made by logged-in donor
exports.getMyDonations = catchAsync(async (req, res, next) => {
  const donations = await prisma.donation.findMany({
    where: { donorId: req.user.id },
    include: {
      userProject: {
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({
    status: 'success',
    results: donations.length,
    data: { donations }
  });
});

// USER or ADMIN: Get donations for a specific user project
exports.getProjectDonations = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;

  // Check if project exists
  const userProject = await prisma.userProject.findUnique({
    where: { id: projectId }
  });

  if (!userProject) {
    return next(new AppError('Project not found', 404));
  }

  // Check authorization: must be project owner or admin
  if (req.user.role !== 'ADMIN' && userProject.userId !== req.user.id) {
    return next(new AppError('You are not authorized to view these donations', 403));
  }

  const donations = await prisma.donation.findMany({
    where: { userProjectId: projectId },
    include: {
      donor: {
        select: {
          name: true,
          email: true,
          organizationName: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  res.status(200).json({
    status: 'success',
    results: donations.length,
    data: { donations }
  });
});
