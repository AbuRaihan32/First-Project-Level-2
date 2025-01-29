import Joi from 'joi';

const UserNameSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': '{#value} is not in capitalize format',
    }),
  middleName: Joi.string().allow(null, ''),
  lastName: Joi.string()
    .required()
    .alphanum()
    .messages({ 'string.alphanum': '{#value} is not valid' }),
});

const GuardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  motherName: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  motherOccupation: Joi.string().required(),
});

const LocalGuardianSchema = Joi.object({
  name: Joi.string().required(),
  contactNo: Joi.string().required(),
  occupation: Joi.string().allow(null, ''),
  address: Joi.string().required(),
});

const StudentSchema = Joi.object({
  id: Joi.string().required(),
  name: UserNameSchema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only':
      '{#value} is not supported. Gender must be either "male" or "female".',
  }),
  dateOfBirth: Joi.string().allow(null, ''),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group.',
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: GuardianSchema.required(),
  localGuardian: LocalGuardianSchema.required(),
  profileImg: Joi.string().uri().allow(null, ''),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only':
      '{#value} is not a valid status. Status must be either "active" or "blocked".',
  }),
});

export default { StudentSchema };
