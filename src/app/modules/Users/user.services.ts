import { AcademicSemester } from './../academicSemester/academicSemester.model';
import config from '../../config';
import { TStudent } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentID } from './users.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create user object for create user into db
  const userData: Partial<TUser> = {};

  // if password not given : set default password
  userData.password = password || (config.default_pass as string);

  // set role in user object
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  // set manually generated id
  userData.id = await generatedStudentID(admissionSemester!);

  // create user into db
  const newUser = await User.create(userData); //! build in static method

  // set id as id :: _id as user
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const result = await Student.create(studentData);
    return result;
  }
};

export const userServices = {
  createStudentIntoDB,
};

//! throw error by using custom static method
//   if (await Student.isStudentExists(studentData.id)) {
//     throw new Error('user already exist');
//   }
//   const student = new Student(studentData); //! create an instance
//! throw error by using custom instance method
// if (await student.isStudentExists(studentData.id)) {
//   throw new Error('user already exist');
// }
//   const result = await student.save(); //! build in instance method
