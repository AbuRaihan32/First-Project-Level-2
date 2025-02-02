import { Request, Response } from 'express';
import { studentServices } from './student.services';
import studentValidations from './student.validations';
// import studentValidations from './student.validations.Joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body.student;

    //! validate data with Joi
    // const { error, value: validatedStudentData } =
    //   studentValidations.StudentSchema.validate(studentData);

    // ! validate data with Zod
    const zodParsedData =
      studentValidations.StudentValidationSchema.parse(studentData);

    const result = await studentServices.createStudentIntoDB(zodParsedData);
    // send response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   });
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
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

const deleteStudent = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await studentServices.deleteStudentFromDB(userId);
    // send response
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
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
  deleteStudent,
};
