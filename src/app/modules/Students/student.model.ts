import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
// import validator from 'validator';
import {
  TGuardian,
  TUserName,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  // TStudentMethods,
} from './student.interface';
import config from '../../config';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'first name can not be more then 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameValue = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameValue === value;
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  occupation: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

const StudentSchema = new Schema<TStudent, TStudentModel>({
  id: {
    type: String,
    required: [true, 'ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    unique: true,
    maxlength: [12, 'password can not be more then 12 characters'],
  },
  name: {
    type: UserNameSchema,
    required: [true, 'Name is required'],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message:
        '{VALUE} is not supported. Gender must be either "male" or "female".',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: '{VALUE} is not a valid email',
    // },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        '{VALUE} is not a valid blood group. Supported blood groups are: A+, A-, B+, B-, AB+, AB-, O+, O-.',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: GuardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: LocalGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImg: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message:
        '{VALUE} is not a valid status. Status must be either "active" or "blocked".',
    },
    default: 'active',
  },
});

// ! pre save middlewares / hooks : it will work in create documents
StudentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// ! post save middlewares / hooks
StudentSchema.post('save', async function () {});

//! add the function for static methods
StudentSchema.statics.isStudentExists = async function name(id: string) {
  const existingUser = Student.findOne({ id });
  return existingUser;
};

//! add the function for instance methods
// StudentSchema.methods.isStudentExists = async function name(id: string) {
//   const existingUser = Student.findOne({ id });
//   return existingUser;
// };

//! create Student model
export const Student = model<TStudent, TStudentModel>('Student', StudentSchema);
