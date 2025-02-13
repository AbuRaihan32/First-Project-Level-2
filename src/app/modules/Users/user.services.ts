import { AcademicSemester } from './../academicSemester/academicSemester.model';
import config from '../../config';
import { TStudent } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentID, generateFacultyId } from './users.utils';
import mongoose from 'mongoose';
import AppErrors from '../../errors/AppErrors';
import status from 'http-status';
import { NextFunction } from 'express';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

// ! create student
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

//! create faculty
const createFacultyIntoDB = async (
  password: string,
  facultyData: TFaculty,
  next: NextFunction,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    facultyData.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppErrors(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppErrors(status.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    facultyData.id = newUser[0].id;
    facultyData.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([facultyData], { session });

    if (!newFaculty.length) {
      throw new AppErrors(status.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    next(err);
  }
};

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
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
