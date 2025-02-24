import { status } from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

//! create
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

//! get all
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  });
});

//! get single
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  if (!result) {
    throw new Error('something went wrong!');
  }

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

//! update
const updateCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body, next);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
});

//! delete
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

//! assign faculty
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Faculties assigned  successfully',
    data: result,
  });
});

//! remove faculty
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Faculties removed  successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};
