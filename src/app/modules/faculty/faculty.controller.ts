import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';
import AppErrors from '../../errors/AppErrors';

//! get all faculties
const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

//! get single faculty
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});

//! update faculty
const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

  if (!result) {
    throw new AppErrors(status.NOT_FOUND, 'something went wrong');
  }

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});

//! delete faculty
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sendResponse(res, {
    status: status.OK,
    success: true,
    message: 'Faculty is deleted successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
