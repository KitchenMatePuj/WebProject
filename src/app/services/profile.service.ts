// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  profile_id?: number;
  keycloak_user_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  account_status?: string;
  // ... etc, lo que te interese
}

export interface MostSaved {
  recipe_id: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8000'; // Ajusta a tu microservicio

  constructor(private http: HttpClient) {}

  getMostSavedRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/saved_recipes/most_saved`);
  }

  // GET: Obtener todos los perfiles
  getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseUrl}/profiles/`);
  }

  // GET: Obtener un perfil específico
  getProfile(keycloakUserId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/${keycloakUserId}`);
  }

  // PUT: Actualizar un perfil (por ID de keycloak o lo que sea tu ruta)
  updateProfile(keycloakUserId: string, data: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/${keycloakUserId}`, data);
  }
}
