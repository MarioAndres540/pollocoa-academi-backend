import { IMateriasRepository } from "../../../../dominio/repositorios/IMateriasRepository";
import { Materia } from "../../../../dominio/entidades/Materia";
import { MateriaModel } from "../models/Materia.model";

export class MateriasRepository implements IMateriasRepository {
     async create(subject: Materia): Promise<Materia> {
    const created = await MateriaModel.create(subject);
    return this.mapToEntity(created);
  }


  async findById(id: string): Promise<Materia | null> {
    const subject = await MateriaModel.findById(id);
    return subject ? this.mapToEntity(subject) : null;
  }

    async findAll(filters?: { isActive?: boolean }): Promise<Materia[]> {
    const query = filters?.isActive !== undefined ? { isActive: filters.isActive } : {};
    const subjects = await MateriaModel.find(query).sort({ createdAt: -1 });
    return subjects.map(this.mapToEntity);
  }

  async update(id: string, materia: Partial<Materia>): Promise<Materia | null> {
    const updated = await MateriaModel.findByIdAndUpdate(
      id,
      materia,
      { new: true, runValidators: true }
    );
    return updated ? this.mapToEntity(updated) : null;
  }

   async delete(id: string): Promise<boolean> {
    const result = await MateriaModel.findByIdAndDelete(id);
    return result !== null;
  }

   async changeStatus(id: string, isActive: boolean): Promise<Materia | null> {
    const updated = await MateriaModel.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    return updated ? this.mapToEntity(updated) : null;
  }

   private mapToEntity(doc: any): Materia {
    return {
      id: doc._id.toString(),
      nombre: doc.name,
      codigo: doc.code,
      description: doc.description,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}