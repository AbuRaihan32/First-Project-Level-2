import { AcademicFacultyRouter } from './../modules/academicFaculty/academicFaculty.route';
import { Router } from 'express';
import { userRoutes } from '../modules/Users/user.router';
import { studentRoutes } from '../modules/Students/student.router';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routers';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
