/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB();
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const result = await studentServices.getSingleStudentFromDB(userId);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'student is retrieved successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const result = await studentServices.deleteStudentFromDB(userId);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'student deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
