import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
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
