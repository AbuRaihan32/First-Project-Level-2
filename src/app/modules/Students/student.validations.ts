import { z } from 'zod';

const UserNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last name is not valid',
  }),
});

const GuardianSchema = z.object({
  fatherName: z.string(),
  fatherContactNo: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherContactNo: z.string(),
  motherOccupation: z.string(),
});

const LocalGuardianSchema = z.object({
  name: z.string(),
  contactNo: z.string(),
  occupation: z.string().optional(),
  address: z.string(),
});

const StudentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(12),
  name: UserNameSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email format'),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default { StudentValidationSchema };
