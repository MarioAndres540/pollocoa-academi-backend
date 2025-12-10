import mongoose, { Schema, Document } from 'mongoose';
import { Materia } from '../../../../dominio/entidades/Materia';

export interface MateriaDocument extends Omit<Materia, 'id'>, Document {}

const materiaSchema: Schema = new Schema<MateriaDocument>(
  {
    nombre: { type: String, required: true },
    codigo: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

materiaSchema.index({ codigo: 1 });
materiaSchema.index({ isActive: 1 });
export const MateriaModel = mongoose.model<MateriaDocument>('Materia', materiaSchema);