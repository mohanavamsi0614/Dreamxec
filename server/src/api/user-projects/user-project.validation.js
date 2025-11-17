const { z } = require('zod');

exports.createUserProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    companyName: z.string().optional(),
    skillsRequired: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    goalAmount: z.number().positive('Goal amount must be positive'),
    imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
});

exports.updateUserProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(200, 'Title too long').optional(),
    description: z.string().min(20, 'Description must be at least 20 characters').optional(),
    companyName: z.string().optional(),
    skillsRequired: z.array(z.string()).optional(),
    timeline: z.string().optional(),
    goalAmount: z.number().positive('Goal amount must be positive').optional(),
    imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
});
