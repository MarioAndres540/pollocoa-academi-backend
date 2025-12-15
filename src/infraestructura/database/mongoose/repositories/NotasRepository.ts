import { Nota } from "../../../../dominio/entidades/Nota";
import { INotasRepository } from "../../../../dominio/repositorios/INotasRepository";
import { NotaModel } from "../models/Nota.model";

export class NotasRepository implements INotasRepository {
  async create(Nota: Nota): Promise<Nota> {
    const created = await NotaModel.create(Nota);
    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<Nota | null> {
    const Nota = await NotaModel.findById(id)
      .populate('estudianteId', 'nombre apellido ')
      .populate('materiaId', 'nombre codigo');
    return Nota ? this.mapToEntity(Nota) : null;
  }

  async findByStudent(estudianteId: string): Promise<Nota[]> {
    const Notas = await NotaModel.find({ estudianteId })
      .populate('materiaId', 'nombre codigo isActive')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async findBySubject(materiaId: string): Promise<Nota[]> {
    const Notas = await NotaModel.find({ materiaId })
      .populate('estudianteId', 'nombre apellido  isActive')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async findByStudentAndSubject(estudianteId: string, materiaId: string): Promise<Nota[]> {
    const Notas = await NotaModel.find({ estudianteId, materiaId })
      .populate('estudianteId', 'nombre apellido ')
      .populate('materiaId', 'nombre codigo')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async findAll(): Promise<Nota[]> {
    const Notas = await NotaModel.find()
      .populate('estudianteId', 'nombre apellido email isActive')
      .populate('materiaId', 'nombre codigo isActive')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async update(id: string, Nota: Partial<Nota>): Promise<Nota | null> {
    const updated = await NotaModel.findByIdAndUpdate(
      id,
      Nota,
      { new: true, runValidators: true }
    )
      .populate('estudianteId', 'nombre codigo email')
      .populate('materiaId', 'nombre codigo');

    return updated ? this.mapToEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await NotaModel.findByIdAndDelete(id);
    return result !== null;
  }

  private mapToEntity(doc: any): Nota {
    return {
      id: doc._id.toString(),
      estudianteId: typeof doc.estudianteId === 'object' ? doc.estudianteId._id.toString() : doc.estudianteId.toString(),
      materiaId: typeof doc.materiaId === 'object' ? doc.materiaId._id.toString() : doc.materiaId.toString(),
      valor: doc.valor,
      description: doc.description,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      estudiante: typeof doc.estudianteId === 'object' ? {
        id: doc.estudianteId._id.toString(),
        nombre: doc.estudianteId.nombre,
        apellido: doc.estudianteId.apellido,
        email: doc.estudianteId.email
      } : undefined,
      materia: typeof doc.materiaId === 'object' ? {
        id: doc.materiaId._id.toString(),
        nombre: doc.materiaId.nombre,
        codigo: doc.materiaId.codigo
      } : undefined
    };
  }
}
