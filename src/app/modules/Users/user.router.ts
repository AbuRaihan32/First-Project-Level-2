import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../Students/student.validations';

const Router = express.Router();

Router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userControllers.createStudent,
);

export const userRouter = Router;
