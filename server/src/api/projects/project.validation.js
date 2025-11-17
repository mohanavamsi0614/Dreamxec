const { z } = require('zod');

exports.createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    detail: z.string().min(20),
    goalAmount: z.coerce.number().positive(), // Use coerce to handle string-to-number conversion
    imageUrl: z.string().url().optional(),
  }),
});

exports.updateProjectSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    detail: z.string().min(20).optional(),
    goalAmount: z.coerce.number().positive().optional(), // Use coerce to handle string-to-number conversion
    imageUrl: z.string().url().optional(),
  }),
});

exports.verifyProjectSchema = z.object({
    body: z.object({
        status: z.enum(['APPROVED', 'REJECTED']),
        reason: z.string().optional(),
    })
});