import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Report {
  report_id: 0,
  reporter_user_id: "string",
  resource_type: "string",
  description: "string",
  status: "string",
  created_at: "2025-04-07T04:59:00.207Z",
  updated_at: "2025-04-07T04:59:00.207Z"

}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public baseUrl = 'http://localhost:8002/reports';

  constructor(private http: HttpClient) {}


  // NUEVO: Buscar reports por tipo, estado y fecha
  searchReports(resource_type?: string, status?: string, created_at?: string, p0?: string | undefined, p1?: string | undefined, p2?: string | undefined): Observable<Report[]> {
    let params = new HttpParams();
    if (resource_type) params = params.set('type', resource_type);
    if (status) params = params.set('status', status);
    if (created_at) params = params.set('date', created_at);
    
    return this.http.get<Report[]>(`${this.baseUrl}/search`, { params });
  }
  }
