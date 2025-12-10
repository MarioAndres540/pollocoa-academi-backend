import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";

export class EliminarNota {
    constructor(private gradeRepository: INotasRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.gradeRepository.findById(id);
    if (!existing) {
      throw new Error('Nota no encontrada');
    }

    const deleted = await this.gradeRepository.delete(id);
    if (!deleted) {
      throw new Error('Error al eliminar la nota');
    }
  }
}
