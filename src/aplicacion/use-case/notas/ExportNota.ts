// src/application/use-cases/grade/ExportNotas.ts
import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { ExcelExporter } from "../../../infraestructura/exports/ExcelExporter";
import { PDFExporter } from "../../../infraestructura/exports/PDFExporter";
import { NotaModel } from "../../../infraestructura/database/mongoose/models/Nota.model";
import { NotaResponseDTO } from "../../dto/NotaDTO";

export class ExportNotas {
  constructor(
    private gradeRepository: INotasRepository,
    private excelExporter: ExcelExporter,
    private pdfExporter: PDFExporter
  ) {}

  async executeExcel(): Promise<Buffer> {
    // Obtener notas con populate para tener toda la información
    const grades = await NotaModel.find()
      .populate('estudianteId', 'nombre apellido email isActive')
      .populate('materiaId', 'nombre codigo isActive')
      .sort({ createdAt: -1 })
      .lean();

    // Formatear las notas según NotaResponseDTO
    const formattedGrades: NotaResponseDTO[] = grades.map(grade => ({
      id: grade._id.toString(),
      estudianteId: grade.estudianteId ? {
        id: (grade.estudianteId as any)._id?.toString(),
        nombre: (grade.estudianteId as any).nombre,
        apellido: (grade.estudianteId as any).apellido,
        email: (grade.estudianteId as any).email,
        isActive: (grade.estudianteId as any).isActive
      } : undefined as any,
      materiaId: grade.materiaId ? {
        id: (grade.materiaId as any)._id?.toString(),
        nombre: (grade.materiaId as any).nombre,
        codigo: (grade.materiaId as any).codigo,
        isActive: (grade.materiaId as any).isActive
      } : undefined as any,
      valor: grade.valor,
      description: grade.description,
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt
    }));

    return this.excelExporter.exportGrades(formattedGrades);
  }

  async executePDF(): Promise<Buffer> {
    const grades = await NotaModel.find()
      .populate('estudianteId', 'nombre apellido email isActive')
      .populate('materiaId', 'nombre codigo isActive')
      .sort({ createdAt: -1 })
      .lean();

    // Formatear las notas según NotaResponseDTO
    const formattedGrades: NotaResponseDTO[] = grades.map(grade => ({
      id: grade._id.toString(),
      estudianteId: grade.estudianteId ? {
        id: (grade.estudianteId as any)._id?.toString(),
        nombre: (grade.estudianteId as any).nombre,
        apellido: (grade.estudianteId as any).apellido,
        email: (grade.estudianteId as any).email,
        isActive: (grade.estudianteId as any).isActive
      } : undefined as any,
      materiaId: grade.materiaId ? {
        id: (grade.materiaId as any)._id?.toString(),
        nombre: (grade.materiaId as any).nombre,
        codigo: (grade.materiaId as any).codigo,
        isActive: (grade.materiaId as any).isActive
      } : undefined as any,
      valor: grade.valor,
      description: grade.description,
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt
    }));

    return this.pdfExporter.exportGrades(formattedGrades);
  }
}