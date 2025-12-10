import { IProfesorRepository } from "../../../../dominio/repositorios/IProfesoresRepository";
import { Profesor } from "../../../../dominio/entidades/Profesor";
import { ProfesorModel } from "../models/Profesor.model";

export class ProfesorRepository implements IProfesorRepository {
   async create(profesorData: Profesor): Promise<Profesor> {
    const created = await ProfesorModel.create(profesorData);
    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Profesor | null> {
    const Profesor = await ProfesorModel.findById(id).select('-password');
    return Profesor ? this.mapToEntity(Profesor) : null;
  }

  async findByEmail(email: string): Promise<Profesor | null> {
    const Profesor = await ProfesorModel.findOne({ email });
    return Profesor ? this.mapToEntityWithPassword(Profesor) : null;
  }

  async findAll(): Promise<Profesor[]> {
    const Profesors = await ProfesorModel.find().select('-password').sort({ createdAt: -1 });
    return Profesors.map(this.mapToEntity);
  }

  async update(id: string, Profesor: Partial<Profesor>): Promise<Profesor | null> {
    const updated = await ProfesorModel.findByIdAndUpdate(
      id,
      Profesor,
      { new: true, runValidators: true }
    ).select('-password');
    
    return updated ? this.mapToEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProfesorModel.findByIdAndDelete(id);
    return result !== null;
  }

  // Mapeo sin password (para respuestas normales)
  private mapToEntity(doc: any): Profesor {
    return {
      id: doc._id.toString(),
      email: doc.email,
      password: '', // No exponemos el password
      nombre: doc.name,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }

  // Mapeo con password (solo para autenticación)
  private mapToEntityWithPassword(doc: any): Profesor {
    return {
      id: doc._id.toString(),
      email: doc.email,
      password: doc.password, // Incluimos el hash para validación
      nombre: doc.name,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}