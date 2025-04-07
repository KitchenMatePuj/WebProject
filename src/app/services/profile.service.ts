// profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

export interface Profile {
  profile_id?: number;
  keycloak_user_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  account_status?: string;
}

export interface MostSaved {
  title: any;
  recipe_id: number;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = `${environment.profileapiBaseUrl}`;

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

  getProfilesBySearch(firstName?: string, lastName?:string, email?: string, accountStatus?:string, alleryName?:string): Observable<any[]> {
    let params = new HttpParams();
    if (firstName) params = params.set('first_name', firstName);
    if (lastName) params = params.set('last_name', lastName);
    if (email) params = params.set('email', email);
    if (accountStatus) params = params.set('account_status', accountStatus)
    if (alleryName) params = params.set('allergy_name', alleryName)
    return this.http.get<any[]>(`${this.baseUrl}/profiles/search`, { params });
  }

  getProfileByKeycloak(keycloakUserId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseUrl}/profiles/${keycloakUserId}`);
  }
}
