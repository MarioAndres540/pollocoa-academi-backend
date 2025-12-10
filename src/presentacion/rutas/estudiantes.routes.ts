import { Router } from 'express';
import { EstudiantesController } from '../controladores/estudiantesController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();
const studentController = new EstudiantesController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas de estudiantes
router.post('/', asyncHandler(studentController.create.bind(studentController)));
router.get('/', asyncHandler(studentController.getAll.bind(studentController)));
router.get('/:id', asyncHandler(studentController.getById.bind(studentController)));
router.put('/:id', asyncHandler(studentController.update.bind(studentController)));
router.patch('/:id/status', asyncHandler(studentController.changeStatus.bind(studentController)));

export default router;