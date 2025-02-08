import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (facultyData: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(facultyData);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const result = await AcademicFaculty.findById(facultyId);
  return result;
};

const updateAcademicFacultyToDB = async (
  facultyId: string,
  updatedDoc: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    updatedDoc,
  );

  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyToDB,
};
