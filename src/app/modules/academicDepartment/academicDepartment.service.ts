import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

//! create
const createAcademicDepartmentIntoDB = async (
  departmentData: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.create(departmentData);
  return result;
};

//! get all
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

//! get single
const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result = await AcademicDepartment.findById(departmentId);
  return result;
};

//! update
const updateAcademicDepartmentToDB = async (
  departmentId: string,
  updatedDoc: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    departmentId,
    updatedDoc,
  );

  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentToDB,
};
