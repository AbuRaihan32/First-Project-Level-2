import mongoose from 'mongoose';
import { Student } from './student.model';
import AppErrors from '../../errors/AppErrors';
import status from 'http-status';
import { NextFunction } from 'express';
import { User } from '../Users/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

//! update
const updateStudentToDB = async (id: string, updatedDoc: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = updatedDoc;

  const modifiedStudentData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedStudentData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string, next: NextFunction) => {
  const isStudentExists = await Student.isStudentExists(id);

  if (!isStudentExists) {
    next('student dos not exist!');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppErrors(status.BAD_REQUEST, 'failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppErrors(status.BAD_REQUEST, 'failed to delete user!');
    }

    await session.commitTransaction();

    return { deletedStudent, deletedUser };
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentToDB,
  deleteStudentFromDB,
};
