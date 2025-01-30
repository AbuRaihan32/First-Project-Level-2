import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData); //! build in static method

  //! throw error by using custom static method
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error('user already exist');
  }

  const student = new Student(studentData); //! create an instance

  //! throw error by using custom instance method
  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error('user already exist');
  // }
  const result = await student.save(); //! build in instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
