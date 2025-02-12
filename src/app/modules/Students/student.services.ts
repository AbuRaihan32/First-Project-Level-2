import mongoose from 'mongoose';
import { Student } from './student.model';
import AppErrors from '../../errors/AppErrors';
import status from 'http-status';
import { NextFunction } from 'express';
import { User } from '../Users/user.model';
import { TStudent } from './student.interface';
import { searchableFields } from './student.constants';
import QueryBuilder from '../../builders/QueryBuilder';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // {
  //     const queryObj = { ...query };

  //   let searchTerm = '';
  //   if (query?.searchTerm) {
  //     searchTerm = query?.searchTerm as string;
  //   }

  //   // ! searchQuery
  //   const searchQuery = Student.find({
  //     $or: searchableFields.map((filed) => ({
  //       [filed]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   });

  //   // delete property from queryObj
  //   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'field'];
  //   excludeFields.forEach((el) => delete queryObj[el]);

  //   //! filter query
  //   const filterQuery = searchQuery
  //     .find(queryObj)
  //     .populate('admissionSemester')
  //     .populate({
  //       path: 'academicDepartment',
  //       populate: {
  //         path: 'academicFaculty',
  //       },
  //     });

  //   // set default sort value and get sort value form query
  //   let sort = '-createdAt';

  //   if (query?.sort) {
  //     sort = query?.sort as string;
  //   }

  //   //! sort query
  //   const sortQuery = filterQuery.sort(sort);

  //   // set default value
  //   let limit = 0;
  //   let page = 1;
  //   let skip = 0;

  //   if (query?.limit) {
  //     limit = Number(query.limit);
  //   }

  //   if (query?.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }

  //   //! paginate query
  //   const paginateQuery = sortQuery.skip(skip);

  //   //! limit query
  //   const limitQuery = paginateQuery.limit(limit);

  //   // default field value
  //   let field = '-__v';

  //   if (query?.field) {
  //     field = (query.field as string).split(',').join(' ');
  //   }

  //   //! field select query
  //   const fieldSelectQuery = limitQuery.select(field);
  // }

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

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
