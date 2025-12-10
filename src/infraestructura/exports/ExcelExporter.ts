// src/infrastructure/exports/ExcelExporter.ts
import ExcelJS from 'exceljs';
import { EstudianteResponseDTO } from '../../aplicacion/dto/EstudianteDTO';
import { MateriaResponseDTO } from '../../aplicacion/dto/MateriaDTO';
import { NotaWithDetailsDTO } from '../../aplicacion/dto/NotaDTO';

export class ExcelExporter {
  // Exportar estudiantes
  async exportStudents(students: EstudianteResponseDTO[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Estudiantes');

    // Configurar columnas
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Nombre', key: 'nombre', width: 20 },
      { header: 'Apellido', key: 'apellido', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Documento', key: 'numeroDocumento', width: 15 },
      { header: 'Estado', key: 'isActive', width: 10 },
      { header: 'Fecha Creación', key: 'createdAt', width: 20 }
    ];

    // Estilo del encabezado
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4472C4' }
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };

    // Agregar datos
    students.forEach(student => {
      worksheet.addRow({
        id: student.id,
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email,
        numeroDocumento: student.numeroDocumento,
        isActive: student.isActive ? 'Activo' : 'Inactivo',
        createdAt: student.createdAt ? new Date(student.createdAt).toLocaleDateString() : ''
      });
    });

    // Auto-ajustar columnas
    worksheet.columns.forEach(column => {
      if (column.header) {
        column.alignment = { vertical: 'middle', horizontal: 'left' };
      }
    });

    // Generar buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  // Exportar materias
  async exportSubjects(subjects: MateriaResponseDTO[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Materias');

    // Configurar columnas
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Código', key: 'codigo', width: 15 },
      { header: 'Descripción', key: 'description', width: 40 },
      { header: 'Estado', key: 'isActive', width: 10 },
      { header: 'Fecha Creación', key: 'createdAt', width: 20 }
    ];

    // Estilo del encabezado
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '70AD47' }
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };

    // Agregar datos
    subjects.forEach(subject => {
      worksheet.addRow({
        id: subject.id,
        nombre: subject.nombre,
        codigo: subject.codigo,
        description: subject.description || 'N/A',
        isActive: subject.isActive ? 'Activo' : 'Inactivo',
        createdAt: subject.createdAt ? new Date(subject.createdAt).toLocaleDateString() : ''
      });
    });

    // Alineación
    worksheet.columns.forEach(column => {
      if (column.header) {
        column.alignment = { vertical: 'middle', horizontal: 'left' };
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  // Exportar notas - AHORA USA NotaWithDetailsDTO
  async exportGrades(grades: NotaWithDetailsDTO[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Notas');

    // Configurar columnas
    worksheet.columns = [
      { header: 'ID Nota', key: 'id', width: 30 },
      { header: 'Estudiante', key: 'studentName', width: 30 },
      { header: 'Email Estudiante', key: 'studentEmail', width: 30 },
      { header: 'Materia', key: 'subjectName', width: 30 },
      { header: 'Código Materia', key: 'subjectCode', width: 15 },
      { header: 'Nota', key: 'value', width: 10 },
      { header: 'Descripción', key: 'description', width: 40 },
      { header: 'Fecha Registro', key: 'createdAt', width: 20 }
    ];

    // Estilo del encabezado
    worksheet.getRow(1).font = { bold: true, size: 12 };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFC000' }
    };
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };

    // Agregar datos
    grades.forEach(grade => {
      worksheet.addRow({
        id: grade.id,
        studentName: grade.estudiante 
          ? `${grade.estudiante.nombre} ${grade.estudiante.apellido}` 
          : 'N/A',
        studentEmail: grade.estudiante?.email || 'N/A',
        subjectName: grade.materia?.nombre || 'N/A',
        subjectCode: grade.materia?.codigo || 'N/A',
        value: grade.valor,
        description: grade.description || 'N/A',
        createdAt: grade.createdAt ? new Date(grade.createdAt).toLocaleDateString() : ''
      });
    });

    // Alineación
    worksheet.columns.forEach(column => {
      if (column.header) {
        column.alignment = { vertical: 'middle', horizontal: 'left' };
      }
    });

    // Colorear notas según valor
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Saltar encabezado
        const gradeValue = row.getCell(6).value as number;
        if (gradeValue >= 3.5) {
          row.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'C6EFCE' }
          };
        } else if (gradeValue >= 3.0) {
          row.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFEB9C' }
          };
        } else {
          row.getCell(6).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFC7CE' }
          };
        }
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}