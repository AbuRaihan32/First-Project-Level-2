import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppErrors from '../../errors/AppErrors';
import status from 'http-status';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

//! middlewares

academicFacultySchema.pre('save', async function (next) {
  const isAcademicFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isAcademicFacultyExist) {
    throw new AppErrors(status.NOT_FOUND, 'Academic Faculty already exists!');
  }

  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const isAcademicFacultyExist = await AcademicFaculty.findOne(this.getQuery());

  if (!isAcademicFacultyExist) {
    throw new AppErrors(status.NOT_FOUND, 'Academic Faculty dos not exists!');
  }

  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'academic-faculty',
  academicFacultySchema,
);
