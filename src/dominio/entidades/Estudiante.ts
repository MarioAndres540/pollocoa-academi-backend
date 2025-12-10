export interface Estudiante {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
  numeroDocumento: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}