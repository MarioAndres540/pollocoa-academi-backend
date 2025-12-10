// src/presentation/middlewares/validateRequest.ts
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map((detail: any) => detail.message);
      res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors
      });
      return;
    }

    next();
  };
};