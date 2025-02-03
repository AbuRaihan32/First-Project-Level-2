import { z } from 'zod';

export const UserValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});
