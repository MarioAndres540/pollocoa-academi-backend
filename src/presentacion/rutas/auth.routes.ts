import { Router } from 'express';
import { AuthController } from '../controladores/auth.contronller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();
const authController = new AuthController();

// Rutas públicas
router.post('/register', asyncHandler(authController.register.bind(authController)));
router.post('/login', asyncHandler(authController.login.bind(authController)));

// Rutas protegidas
router.get('/profile', authMiddleware, asyncHandler(authController.getProfile.bind(authController)));

export default router;