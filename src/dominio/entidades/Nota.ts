export interface Nota {
  id?: string;
  estudianteId: string;
  materiaId: string;
  valor: number; // Entre 0 y 5
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  estudiante?: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
  };
  materia?: {
    id: string;
    nombre: string;
    codigo: string;
  };
}