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
      .populate('studentId', 'firstName lastName email')
      .populate('subjectId', 'name code');
    return Nota ? this.mapToEntity(Nota) : null;
  }

  async findByStudent(studentId: string): Promise<Nota[]> {
    const Notas = await NotaModel.find({ studentId })
      .populate('subjectId', 'name code credits isActive')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async findBySubject(subjectId: string): Promise<Nota[]> {
    const Notas = await NotaModel.find({ subjectId })
      .populate('studentId', 'firstName lastName email isActive')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async findByStudentAndSubject(studentId: string, subjectId: string): Promise<Nota[]> {
    const Notas = await NotaModel.find({ studentId, subjectId })
      .populate('studentId', 'firstName lastName email')
      .populate('subjectId', 'name code')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async findAll(): Promise<Nota[]> {
    const Notas = await NotaModel.find()
      .populate('studentId', 'firstName lastName email isActive')
      .populate('subjectId', 'name code isActive')
      .sort({ createdAt: -1 });
    return Notas.map(this.mapToEntity);
  }

  async update(id: string, Nota: Partial<Nota>): Promise<Nota | null> {
    const updated = await NotaModel.findByIdAndUpdate(
      id,
      Nota,
      { new: true, runValidators: true }
    )
      .populate('studentId', 'firstName lastName email')
      .populate('subjectId', 'name code');
    
    return updated ? this.mapToEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await NotaModel.findByIdAndDelete(id);
    return result !== null;
  }

  private mapToEntity(doc: any): Nota {
    return {
      id: doc._id.toString(),
      estudianteId: typeof doc.studentId === 'object' ? doc.studentId._id.toString() : doc.studentId.toString(),
      materiaId: typeof doc.subjectId === 'object' ? doc.subjectId._id.toString() : doc.subjectId.toString(),
      valor: doc.value,
      description: doc.description,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}
