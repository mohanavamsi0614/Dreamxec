const { z } = require('zod');

exports.createPaymentIntentSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be a positive number'),
    projectId: z.string().min(1, 'Project ID is required'),
  }),
});

exports.makeDonationSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be a positive number'),
    userProjectId: z.string().min(1, 'User project ID is required'),
    message: z.string().optional(),
    anonymous: z.boolean().optional(),
  }),
});