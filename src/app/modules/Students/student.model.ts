import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TUserName,
  TLocalGuardian,
  TStudent,
  TStudentModel,
  // TStudentMethods,
} from './student.interface';

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

const StudentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      unique: [true, 'user id must be unique'],
      ref: 'User',
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// ! virtual
StudentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// ! query middlewares
//* pre find middleware : work in current query
StudentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// * pre findOne middleware
StudentSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// * pre aggregate middleware
StudentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//! add the function for static methods
StudentSchema.statics.isStudentExists = async function name(id: string) {
  const existingUser = Student.findOne({ id });
  return existingUser;
};

//* add the function for instance methods
// StudentSchema.methods.isStudentExists = async function name(id: string) {
//   const existingUser = Student.findOne({ id });
//   return existingUser;
// };

//! create Student model
export const Student = model<TStudent, TStudentModel>('Student', StudentSchema);
