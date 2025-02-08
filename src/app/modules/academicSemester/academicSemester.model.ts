import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constants';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
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
  },
  {
    timestamps: true,
  },
);

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

AcademicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const isAcademicSemesterExist = await AcademicSemester.findOne(
    this.getQuery(),
  );

  if (!isAcademicSemesterExist) {
    throw new Error('Academic Semester dos not exists!');
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'Academic-Semester',
  AcademicSemesterSchema,
);
