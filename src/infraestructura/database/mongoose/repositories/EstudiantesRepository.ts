import { IEstudiantesRepository } from "../../../../dominio/repositorios/IEstudiantesRepository";
import { Estudiante } from "../../../../dominio/entidades/Estudiante";
import { EstudianteModel } from "../models/Estudiante.model";

export class EstudiantesRepository implements IEstudiantesRepository {

    async create(Estudiante: Estudiante): Promise<Estudiante> {
        const created = await EstudianteModel.create(Estudiante);
        return this.mapToEntity(created);
    }

    async findById(id: string): Promise<Estudiante | null> {
        const estudiante = await EstudianteModel.findById(id);
        return estudiante ? this.mapToEntity(estudiante) : null;
    }

    async findAll(filters?: { isActive?: boolean }): Promise<Estudiante[]> {
        const query = filters?.isActive !== undefined ? { isActive: filters.isActive } : {};
        const students = await EstudianteModel.find(query).sort({ createdAt: -1 });
        return students.map(this.mapToEntity);
    }

    async update(id: string, Estudiante: Partial<Estudiante>): Promise<Estudiante | null> {
        const updated = await EstudianteModel.findByIdAndUpdate(id, Estudiante, { new: true });
        return updated ? this.mapToEntity(updated) : null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await EstudianteModel.findByIdAndDelete(id);
        return result !== null;
    }

    async changeStatus(id: string, isActive: boolean): Promise<Estudiante | null> {
        const updated = await EstudianteModel.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );
        return updated ? this.mapToEntity(updated) : null;
    }

    private mapToEntity(doc: any): Estudiante {
        return {
            id: doc._id.toString(),
            nombre: doc.nombre,
            apellido: doc.apellido,
            email: doc.email,
            numeroDocumento: doc.numeroDocumento,
            isActive: doc.isActive,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        };
    }
}