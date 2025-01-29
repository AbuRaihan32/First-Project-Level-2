import { Request, Response } from 'express';
import { studentServices } from './student.services';
import studentValidations from './student.validations';

const createStudent = async (req: Request, res: Response) => {
  const studentData = req.body.student;
  const { error, value: validatedStudentData } =
    studentValidations.StudentSchema.validate(studentData);

  if (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error.details,
    });
  } else {
    const result =
      await studentServices.createStudentIntoDB(validatedStudentData);
    // send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    // send response
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await studentServices.getSingleStudentFromDB(userId);

    // send response
    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: err,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
