// src/application/dto/SubjectDTO.ts
export interface CreateMateriatDTO {
  nombre: string;
  codigo: string;
  description?: string;
  credits: number;
}

export interface UpdateMateriaDTO {
  nombre?: string;
  codigo?: string;
  description?: string;
  credits?: number;
}

export interface MateriaResponseDTO {
  id: string;
  nombre: string;
  codigo: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}