import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { AcademicSemesterServices } from './academicSemester.services';

// ! create Academic Semester controller
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

// ! get all Academic Semester controller
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemesterFromDB();

    if (!result.length) {
      throw new Error('there is no semester');
    }
    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'All semesters is retrieved successfully!',
      data: result,
    });
  },
);

// ! get Single Academic Semester controller
const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { SemesterID } = req.params;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
        SemesterID,
      );

    if (!result) {
      throw new Error('there is no semester for this ID');
    }
    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'semester is retrieved successfully!',
      data: result,
    });
  },
);

// ! get Single Academic Semester controller
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { SemesterID } = req.params;
    const updatedDoc = req.body;
    const result = await AcademicSemesterServices.UpdateAcademicSemesterToDB(
      SemesterID,
      updatedDoc,
    );

    if (result.matchedCount == 0) {
      throw new Error('no semester match this Id');
    }
    if (!result.acknowledged) {
      throw new Error('invalid input');
    }
    if (result.modifiedCount == 0) {
      throw new Error('everything Up to date');
    }
    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'semester is updated successfully!',
      data: result,
    });
  },
);

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
