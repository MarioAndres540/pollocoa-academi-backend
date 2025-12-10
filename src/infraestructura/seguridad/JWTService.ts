// src/infrastructure/security/JWTService.ts
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../../configuracion/env';

export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
}

export class JWTService {
    private readonly secret: string;
    private readonly expiresIn: string | number;

    constructor() {
        // Validar que el secret exista
        if (!config.jwt.secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        this.secret = config.jwt.secret;

        // Convertir expiresIn si es un número en string
        const expiresIn = config.jwt.expiresIn;
        if (expiresIn && !isNaN(Number(expiresIn))) {
            this.expiresIn = Number(expiresIn);
        } else {
            this.expiresIn = expiresIn || '24h';
        }
    }

    generateToken(payload: JWTPayload): string {
        const options: SignOptions = {
            expiresIn: this.expiresIn
        } as SignOptions


        return jwt.sign(payload, this.secret, options);
    }

    verifyToken(token: string): JWTPayload | null {
        try {
            return jwt.verify(token, this.secret) as JWTPayload;
        } catch (error) {
            console.error('Token verification error:', error);
            return null;
        }
    }

    decodeToken(token: string): JWTPayload | null {
        return jwt.decode(token) as JWTPayload;
    }
}