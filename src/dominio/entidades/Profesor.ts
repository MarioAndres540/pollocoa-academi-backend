export interface Profesor {
  id?: string;
  email: string;
  password: string;
  nombre: string;
  role: 'teacher' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}