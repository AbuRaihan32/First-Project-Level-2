import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//! student ID
const findLastStudent = async (admissionSemester: TAcademicSemester) => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
      id: new RegExp(`^${admissionSemester.year}${admissionSemester.code}`),
    },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentID = async (
  admissionSemester: TAcademicSemester,
) => {
  let currentId = '0000';
  const lastStudentId = await findLastStudent(admissionSemester);

  if (lastStudentId) {
    currentId = lastStudentId.substring(6);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  const newId = `${admissionSemester.year}${admissionSemester.code}${incrementId}`;

  return newId;
};

//! Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

//! Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
