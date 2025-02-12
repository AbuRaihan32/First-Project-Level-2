import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import AppErrors from '../../errors/AppErrors';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'students are retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await studentServices.getSingleStudentFromDB(studentId);
  if (!result) {
    throw new AppErrors(status.NOT_FOUND, 'student not found!');
  }
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'student is retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await studentServices.updateStudentToDB(studentId, student);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'student is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await studentServices.deleteStudentFromDB(studentId, next);
  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'student is deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
