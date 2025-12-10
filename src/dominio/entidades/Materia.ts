export interface Materia {
  id?: string;
  nombre: string;
  codigo: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}