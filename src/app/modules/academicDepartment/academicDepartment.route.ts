import { Router } from 'express';
import { academicDepartmentValidations } from './academicDepartmentValidation';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentControllers } from './academicDepartment.controllers';

const router = Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidations.createAcademicDepartmentValidationSchema,
  // ),
  academicDepartmentControllers.createAcademicDepartment,
);

router.get('/', academicDepartmentControllers.getAllAcademicDepartments);
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
