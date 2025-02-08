import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.get('/', studentControllers.getAllStudents);
router.get('/:userId', studentControllers.getSingleStudent);
router.delete('/:userId', studentControllers.deleteStudent);

export const studentRouter = router;
