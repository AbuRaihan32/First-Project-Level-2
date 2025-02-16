import { status } from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppErrors from '../../errors/AppErrors';
import { CourseSearchableFields } from './course.constants';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculties } from './course.model';
import { NextFunction } from 'express';
import mongoose from 'mongoose';

//! create
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

//! get all
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

//! get single
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

//! update
const updateCourseIntoDB = async (
  id: string,
  updatedDoc: Partial<TCourse>,
  next: NextFunction,
) => {
  const { preRequisiteCourses, ...remainingCourseData } = updatedDoc;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // update basic course data
    const updatedBasicCourses = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourses) {
      throw new AppErrors(status.BAD_REQUEST, 'Failed to update course!');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out the delete preRequisiteCourses
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course); // return just course id

      // remove deleted preRequisites from preRequisiteCourses field
      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppErrors(status.BAD_REQUEST, 'Failed to update course!');
      }

      // filter out new preRequisiteCourses
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      // add newPreRequisites in preRequisiteCourses field
      const updatedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );

      if (!updatedPreRequisiteCourses) {
        throw new AppErrors(status.BAD_REQUEST, 'Failed to update course!');
      }
    }

    session.commitTransaction();
    session.endSession();

    const result = await Course.findById(id);
    return result;
  } catch (err) {
    session.abortTransaction();
    session.endSession();
    next(err);
  }
};

//! delete
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  updatedDoc: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculties.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: updatedDoc } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculties.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
