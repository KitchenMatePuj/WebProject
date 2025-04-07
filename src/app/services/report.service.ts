import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Report {
  id?: number;
  type: string;
  user: string;
  status: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8001/reports'; // Ajusta al endpoint real

  constructor(private http: HttpClient) {}

  // 🔍 Método para buscar reportes con filtros dinámicos
  searchReports(filters: any): Observable<Report[]> {
    return this.http.post<Report[]>(`${this.baseUrl}/search`, filters);
  }
  
  
  // Obtener un reporte por ID
  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }

  // Crear un nuevo reporte
  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, report);
  }

  // Actualizar un reporte existente
  updateReport(id: number, report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.baseUrl}/${id}`, report);
  }

  // Eliminar un reporte
  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
