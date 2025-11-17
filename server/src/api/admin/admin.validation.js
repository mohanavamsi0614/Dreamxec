const { z } = require('zod');

exports.verifyProjectSchema = z.object({
  body: z.object({
    status: z.enum(['APPROVED', 'REJECTED'], {
      errorMap: () => ({ message: 'Status must be either APPROVED or REJECTED' }),
    }),
    reason: z.string().optional(),
  }),
});
