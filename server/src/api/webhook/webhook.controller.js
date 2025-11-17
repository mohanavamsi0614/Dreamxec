const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const prisma = require('../../config/prisma');
const sendEmail = require('../../services/email.service');
const AppError = require('../../utils/AppError');


const fulfillOrder = async (session) => {
    const { projectId, donorId } = session.metadata;
    const amount = session.amount_received / 100; // Convert back from cents
  
    try {
      // Use a transaction to ensure atomicity
      await prisma.$transaction(async (tx) => {
        // 1. Create the Donation record
        await tx.donation.create({
          data: {
            amount,
            paymentIntentId: session.id,
            projectId,
            donorId,
          },
        });
  
        // 2. Update the project's amountRaised
        await tx.project.update({
          where: { id: projectId },
          data: {
            amountRaised: {
              increment: amount,
            },
          },
        });
      });
  
      // 3. Send confirmation email (outside the transaction)
      const donor = await prisma.user.findUnique({ where: { id: donorId }});
      const project = await prisma.project.findUnique({ where: { id: projectId }});

      if (donor && project) {
          const message = `Dear ${donor.name || 'donor'},\n\nThank you for your generous donation of $${amount.toFixed(2)} to the project "${project.title}".\n\nYour contribution is greatly appreciated!\n\nBest,\nThe Crowdfunding Team`;
          await sendEmail({
              email: donor.email,
              subject: 'Donation Confirmation & Receipt',
              message
          });
      }
  
    } catch (error) {
      console.error('Error fulfilling order:', error);
      // Handle the error appropriately, maybe log it to a monitoring service
      throw new AppError('Failed to process the donation after payment.', 500);
    }
  };

exports.handleStripeEvent = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✅ PaymentIntent was successful!');
      await fulfillOrder(paymentIntent);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};