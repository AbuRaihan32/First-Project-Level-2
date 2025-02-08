import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

// ! create faculty
const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'faculty is created successfully',
      data: result,
    });
  },
);

// ! get all faculties
const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyServices.getAllAcademicFacultyFromDB();

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'faculties are retrieved successfully',
      data: result,
    });
  },
);

// ! get single faculty
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'faculty is retrieved successfully',
      data: result,
    });
  },
);

// ! update faculty
const updateAcademicFacultyToDB = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const updatedDoc = req.body;

    const result = await academicFacultyServices.updateAcademicFacultyToDB(
      facultyId,
      updatedDoc,
    );

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'faculty is updated successfully',
      data: result,
    });
  },
);

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFacultyToDB,
};
