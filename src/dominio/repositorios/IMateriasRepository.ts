import { Materia } from "../entidades/Materia";

export interface IMateriasRepository {
  create(Materia: Materia): Promise<Materia>;
  findById(id: string): Promise<Materia | null>;
  findAll(filters?: { isActive?: boolean }): Promise<Materia[]>;
  update(id: string, Materia: Partial<Materia>): Promise<Materia | null>;
  delete(id: string): Promise<boolean>;
  changeStatus(id: string, isActive: boolean): Promise<Materia | null>;
}