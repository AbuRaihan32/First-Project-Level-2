import { AcademicSemester } from './../academicSemester/academicSemester.model';
import config from '../../config';
import { TStudent } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentID } from './users.utils';
import mongoose from 'mongoose';
import AppErrors from '../../errors/AppErrors';
import status from 'http-status';
import { NextFunction } from 'express';

// ! create user and student
const createStudentIntoDB = async (
  password: string,
  studentData: TStudent,
  next: NextFunction,
) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  // start transaction
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generatedStudentID(admissionSemester!);

    // create user
    const newUser = await User.create([userData], { session }); //! build in static method
    if (!newUser.length) {
      throw new AppErrors(status.BAD_REQUEST, 'failed to create user!..');
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppErrors(status.BAD_REQUEST, 'failed to create student!..');
    }

    await session.commitTransaction();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
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
