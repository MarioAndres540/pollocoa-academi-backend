// src/application/dto/GradeDTO.ts
export interface CreateNotaDTO {
  estudianteId: string;
  materiaId: string;
  valor: number;
  description?: string;
}

export interface UpdateNotaDTO {
  valor?: number;
  description?: string;
}

export interface NotaResponseDTO {
  id: string;
  estudianteId: string;
  materiaId: string;
  valor: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotaWithDetailsDTO extends NotaResponseDTO {
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