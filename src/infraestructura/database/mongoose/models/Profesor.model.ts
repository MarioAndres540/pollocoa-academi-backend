import mongoose, { Schema, Document } from 'mongoose';
import { Profesor } from '../../../../dominio/entidades/Profesor';

export interface ProfesorDocument extends Omit<Profesor, 'id'>, Document {}

const profesorSchema: Schema = new Schema<ProfesorDocument>(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true  },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'admin'], default: 'teacher' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


export const ProfesorModel = mongoose.model<ProfesorDocument>('Profesor', profesorSchema);