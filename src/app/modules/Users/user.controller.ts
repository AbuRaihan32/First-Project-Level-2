import { userServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppErrors from '../../errors/AppErrors';

// ! create student
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDB(
    password,
    studentData,
    next,
  );

  if (!result) {
    throw new AppErrors(500, 'something went wrong!');
  }

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'student is created successfully',
    data: result,
  });
});

//! create faculty
const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(
    password,
    facultyData,
    next,
  );

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
};

// ! validate data with Zod
// const zodParsedData =
//   studentValidations.StudentValidationSchema.parse(studentData);

//! validate data with Joi
// const { error, value: validatedStudentData } =
//   studentValidations.StudentSchema.validate(studentData);
// if (error) {
//   res.status(500).json({
//     success: false,
//     message: 'something went wrong',
//     error: error.details,
//   });
// }
