import { Router } from 'express';
import { userRoutes } from '../modules/Users/user.router';
import { studentRoutes } from '../modules/Students/student.router';

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
