import { Router } from 'express';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.deleteAdmin);

export const AdminRouter = router;
