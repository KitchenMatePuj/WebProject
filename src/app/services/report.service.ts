import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ajusta esta interfaz a lo que tu microservicio de reports realmente maneje.
// Por ejemplo, si tus reports tienen campos como 'type', 'date', 'description', etc.
export interface Report {
  id?: number;       // si es autoincremental en la base
  title: string;
  content: string;
  created_at?: string; // Ajusta según tus campos reales
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // Ajusta la URL base al endpoint de tu microservicio de Reports:
  // podría ser "http://localhost:8000/reports" o el puerto que uses.
  private baseUrl = 'http://localhost:8000/reports';

  constructor(private http: HttpClient) {}

  // GET: Obtener todos los reports
  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  // GET: Obtener un report por su ID
  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }

  // POST: Crear un nuevo report
  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, report);
  }

  // PUT: Actualizar un report existente
  updateReport(id: number, report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.baseUrl}/${id}`, report);
  }

  // DELETE: Eliminar un report
  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
