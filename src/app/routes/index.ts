import { AcademicFacultyRouter } from './../modules/academicFaculty/academicFaculty.route';
import { Router } from 'express';
import { userRouter } from '../modules/Users/user.router';
import { studentRouter } from '../modules/Students/student.router';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.routers';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRouter } from '../modules/faculty/faculty.router';
import { AdminRouter } from '../modules/admin/admin.router';
import { CourseRouter } from '../modules/course/course.router';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
