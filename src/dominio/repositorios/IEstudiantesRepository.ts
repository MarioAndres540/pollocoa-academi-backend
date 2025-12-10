import { Estudiante } from "../entidades/Estudiante";

export interface IEstudiantesRepository {
  create(Estudiante: Estudiante): Promise<Estudiante>;
  findById(id: string): Promise<Estudiante | null>;
  findAll(filters?: { isActive?: boolean }): Promise<Estudiante[]>;
  update(id: string, Estudiante: Partial<Estudiante>): Promise<Estudiante | null>;
  delete(id: string): Promise<boolean>;
  changeStatus(id: string, isActive: boolean): Promise<Estudiante | null>;
}