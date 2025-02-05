import { Router } from 'express';
import { academicSemesterControllers } from './academicSemester.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidations';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.CreateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

router.get('/', academicSemesterControllers.getAllAcademicSemester);
router.get(
  '/:SemesterID',
  academicSemesterControllers.getSingleAcademicSemester,
);
router.put(
  '/:SemesterID',
  validateRequest(
    AcademicSemesterValidations.UpdateAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
