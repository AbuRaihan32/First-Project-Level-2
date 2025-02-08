import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.service';
import { Request, Response } from 'express';

// ! create Department
const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Department is created successfully',
      data: result,
    });
  },
);

// ! get all Departments
const getAllAcademicDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentServices.getAllAcademicDepartmentsFromDB();

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Departments are retrieved successfully',
      data: result,
    });
  },
);

// ! get single Department
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result =
      await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
        departmentId,
      );

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Department is retrieved successfully',
      data: result,
    });
  },
);

// ! update Department
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const updatedDoc = req.body;

    const result =
      await academicDepartmentServices.updateAcademicDepartmentToDB(
        departmentId,
        updatedDoc,
      );

    sendResponse(res, {
      status: status.OK,
      success: true,
      message: 'Department is updated successfully',
      data: result,
    });
  },
);

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
