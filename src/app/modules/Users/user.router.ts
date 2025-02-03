import express from 'express';
import { userControllers } from './user.controller';

const Router = express.Router();

Router.post('/create-student', userControllers.createStudent);

export const userRoutes = Router;
