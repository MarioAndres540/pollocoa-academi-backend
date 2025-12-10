import { Nota } from "../entidades/Nota";

export interface INotasRepository {
create(Nota: Nota): Promise<Nota>;
  findById(id: string): Promise<Nota | null>;
  findByStudent(studentId: string): Promise<Nota[]>;
  findBySubject(subjectId: string): Promise<Nota[]>;
  findByStudentAndSubject(studentId: string, subjectId: string): Promise<Nota[]>;
  findAll(): Promise<Nota[]>;
  update(id: string, Nota: Partial<Nota>): Promise<Nota | null>;
  delete(id: string): Promise<boolean>;
}