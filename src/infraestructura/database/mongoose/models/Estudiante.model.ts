import mongoose, {Schema, Document} from "mongoose";
import { Estudiante } from "../../../../dominio/entidades/Estudiante";

export interface EstudianteDocument extends Omit<Estudiante, 'id'>, Document {}

const estudianteSchema: Schema = new Schema<EstudianteDocument>(
    {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        numeroDocumento: { type: String, required: true, unique: true },
        isActive: { type: Boolean, default: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);


estudianteSchema.index({ numeroDocumento: 1 });
estudianteSchema.index({ isActive: 1 });

export const EstudianteModel = mongoose.model<EstudianteDocument>('Estudiante', estudianteSchema);