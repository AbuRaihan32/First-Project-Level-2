import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { AcademicSemesterServices } from './academicSemester.services';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'academic semester is created successfully!',
      data: result,
    });
  },
);

export const academicSemesterControllers = {
  createAcademicSemester,
};
