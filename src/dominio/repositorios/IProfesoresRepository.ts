import { Profesor } from "../entidades/Profesor";

export interface IProfesorRepository {
 create(user: Profesor): Promise<Profesor>;
  findById(id: string): Promise<Profesor | null>;
  findByEmail(email: string): Promise<Profesor | null>;
  findAll(): Promise<Profesor[]>;
  update(id: string, user: Partial<Profesor>): Promise<Profesor | null>;
  delete(id: string): Promise<boolean>;
}