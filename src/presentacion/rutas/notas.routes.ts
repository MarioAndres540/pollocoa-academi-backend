import { Router } from 'express';
import { NotasController } from '../controladores/notasController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();
const gradeController = new NotasController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas de notas
router.post('/', asyncHandler(gradeController.create.bind(gradeController)));
router.get('/', asyncHandler(gradeController.getAll.bind(gradeController)));
router.get('/student/:studentId', asyncHandler(gradeController.getByStudent.bind(gradeController)));
router.get('/subject/:subjectId', asyncHandler(gradeController.getBySubject.bind(gradeController)));
router.put('/:id', asyncHandler(gradeController.update.bind(gradeController)));
router.delete('/:id', asyncHandler(gradeController.delete.bind(gradeController)));

export default router;
