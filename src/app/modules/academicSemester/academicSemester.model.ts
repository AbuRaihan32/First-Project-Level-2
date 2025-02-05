import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constants';

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: academicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
    enum: months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: months,
  },
});

// ! middlewares
AcademicSemesterSchema.pre('save', async function (next) {
  const isExistSemesterInYear = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isExistSemesterInYear) {
    throw new Error('Semester Already Exist Is this Year !');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'Academic-Semester',
  AcademicSemesterSchema,
);
