import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ad {
  id?: number;
  title: string;
  description: string;
  // etc...
}

@Injectable({
  providedIn: 'root'
})
export class AdvertisingService {
  private baseUrl = 'http://localhost:8000/advertising'; // Ajusta al puerto que uses

  constructor(private http: HttpClient) {}

  // GET: Obtener todos
  getAllAds(): Observable<Ad[]> {
    return this.http.get<Ad[]>(`${this.baseUrl}`);
  }

  // GET: Obtener uno por ID
  getAdById(id: number): Observable<Ad> {
    return this.http.get<Ad>(`${this.baseUrl}/${id}`);
  }

  // POST: Crear nuevo
  createAd(ad: Ad): Observable<Ad> {
    return this.http.post<Ad>(`${this.baseUrl}`, ad);
  }

  // PUT: Actualizar
  updateAd(id: number, ad: Ad): Observable<Ad> {
    return this.http.put<Ad>(`${this.baseUrl}/${id}`, ad);
  }

  // DELETE: Eliminar
  deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
