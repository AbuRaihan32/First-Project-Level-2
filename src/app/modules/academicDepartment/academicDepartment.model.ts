import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppErrors from '../../errors/AppErrors';
import status from 'http-status';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academic-faculty',
    },
  },
  {
    timestamps: true,
  },
);

//! middlewares

AcademicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new AppErrors(status.NOT_FOUND, 'Department already exists!');
  }

  next();
});

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne(this.getQuery());

  if (!isDepartmentExist) {
    throw new AppErrors(status.NOT_FOUND, 'Department dos not exists!');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'academic-department',
  AcademicDepartmentSchema,
);
