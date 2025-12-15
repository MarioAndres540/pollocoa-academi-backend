import { Router } from 'express';
import { EstudiantesController } from '../controladores/estudiantesController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();
const studentController = new EstudiantesController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas de estudiantes
router.post('/', authMiddleware, asyncHandler(studentController.create.bind(studentController)));
router.get('/', authMiddleware, asyncHandler(studentController.getAll.bind(studentController)));
router.get('/:id', authMiddleware, asyncHandler(studentController.getById.bind(studentController)));
router.put('/:id', authMiddleware, asyncHandler(studentController.update.bind(studentController)));
router.patch('/:id/status', authMiddleware, asyncHandler(studentController.changeStatus.bind(studentController)));
router.get('/export/excel', authMiddleware, asyncHandler(studentController.exportExcel.bind(studentController)));
router.get('/export/pdf', authMiddleware, asyncHandler(studentController.exportPDF.bind(studentController)));

export default router;