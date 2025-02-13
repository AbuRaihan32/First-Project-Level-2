import status from 'http-status';
import AppErrors from '../../errors/AppErrors';
import { AcademicSemesterNameCodeMapper } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// ! create Academic Semester
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppErrors(status.NOT_FOUND, 'Invalid Semester Code!');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

// ! get all academic semester
const getAllAcademicSemesterFromDB = async () => {
  const result = AcademicSemester.find();
  return result;
};

// ! get single academic semester
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = AcademicSemester.findById(id);
  return result;
};
// ! update academic semester
const UpdateAcademicSemesterToDB = async (
  id: string,
  updatedDoc: TAcademicSemester,
) => {
  if (updatedDoc.name && !updatedDoc.code) {
    throw new AppErrors(status.NOT_FOUND, 'code is required for change name!');
  }
  if (!updatedDoc.name && updatedDoc.code) {
    throw new AppErrors(status.NOT_FOUND, 'name is required for change code!');
  }
  if (AcademicSemesterNameCodeMapper[updatedDoc.name] !== updatedDoc.code) {
    throw new AppErrors(status.NOT_FOUND, 'Invalid Semester Code!');
  }
  const result = AcademicSemester.findByIdAndUpdate(id, updatedDoc);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  UpdateAcademicSemesterToDB,
};
