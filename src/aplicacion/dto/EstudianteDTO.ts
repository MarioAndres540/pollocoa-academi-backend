// src/application/dto/StudentDTO.ts
export interface CreateEstudianteDTO {
  nombre: string;
  apellido: string;
  email: string;
  numeroDocumento: string;
}

export interface UpdateEstudianteDTO {
  nombre?: string;
  apellido?: string;
  email?: string;
  numeroDocumento?: string;
}

export interface EstudianteResponseDTO {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  numeroDocumento: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}