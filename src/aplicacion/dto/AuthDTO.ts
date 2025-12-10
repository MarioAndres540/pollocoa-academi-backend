// src/application/dto/AuthDTO.ts
export interface RegisterDTO {
  email: string;
  password: string;
  nombre: string;
  role?: 'teacher' | 'admin';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: {
    id: string;
    email: string;
    nombre: string;
    role: string;
  };
}