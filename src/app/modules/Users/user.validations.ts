import { z } from 'zod';

export const UserValidationSchema = z.object({
  id: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(['student', 'faculty', 'admin']),
  status: z.enum(['in-progress', 'blocked']).optional().default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});
