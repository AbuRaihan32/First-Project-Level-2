import express from 'express';
import { userControllers } from './user.controller';
import createStudentValidationSchema from '../Students/student.validations';
import validateRequest from '../../middlewares/validateRequest';

const Router = express.Router();

Router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userControllers.createStudent,
);

export const userRouter = Router;
