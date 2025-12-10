import mongoose, { Schema, Document, Types } from 'mongoose';
import { Nota } from '../../../../dominio/entidades/Nota';

export interface NotaDocument extends Omit<Nota, 'id' | 'estudianteId' | 'materiaId'>, Document {
  estudianteId: Types.ObjectId;
  materiaId: Types.ObjectId;
}

const notaSchema: Schema = new Schema<NotaDocument>(
    {
        estudianteId: { type: Schema.Types.ObjectId, ref: 'Estudiante', required: true },
        materiaId: { type: Schema.Types.ObjectId, ref: 'Materia', required: true },
        valor: { type: Number, required: true, min: 0, max: 5 },
        description: { type: String, trim: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);  
notaSchema.index({ studentId: 1 });

export const NotaModel = mongoose.model<NotaDocument>('Nota', notaSchema);