import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

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
