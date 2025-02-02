import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudents);
router.get('/:userId', studentControllers.getSingleStudent);
router.delete('/:userId', studentControllers.deleteStudent);

export const studentRoutes = router;
