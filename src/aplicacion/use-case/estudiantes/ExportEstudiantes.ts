import { TodosLosEstudiantes } from "./TodosLosEstudiantes";
import { ExcelExporter } from "../../../infraestructura/exports/ExcelExporter";
import { PDFExporter } from "../../../infraestructura/exports/PDFExporter";
import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";

export class ExportEstudiantes {
     constructor(
    private studentRepository: IEstudiantesRepository,
    private excelExporter: ExcelExporter,
    private pdfExporter: PDFExporter
  ) {}

  async executeExcel(onlyActive?: boolean): Promise<Buffer> {
    const getAllStudents = new TodosLosEstudiantes(this.studentRepository);
    const students = await getAllStudents.execute(onlyActive);
    return this.excelExporter.exportStudents(students);
  }

  async executePDF(onlyActive?: boolean): Promise<Buffer> {
    const getAllStudents = new TodosLosEstudiantes(this.studentRepository);
    const students = await getAllStudents.execute(onlyActive);
    return this.pdfExporter.exportStudents(students);
  }
}