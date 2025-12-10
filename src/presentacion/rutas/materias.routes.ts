import { Router } from 'express';
import { MateriasController } from '../controladores/materiasController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();
const subjectController = new MateriasController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas de materias
router.post('/', asyncHandler(subjectController.create.bind(subjectController)));
router.get('/', asyncHandler(subjectController.getAll.bind(subjectController)));
router.get('/:id', asyncHandler(subjectController.getById.bind(subjectController)));
router.put('/:id', asyncHandler(subjectController.update.bind(subjectController)));
router.patch('/:id/status', asyncHandler(subjectController.changeStatus.bind(subjectController)));

export default router;
