import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// (Opcional) Define una interfaz para tus recetas
export interface Recipe {
  recipe_id: number;
  category_id: number;
  title: string;
  created_at: string;   // O 'Date' si quieres parsearlo
  updated_at: string;   // O 'Date' si quieres parsearlo
  cooking_time: number;
  food_type: string;
  total_portions: number;
  keycloak_user_id: string;
  rating_avg: number;
}

export interface TotalRecipeCount {
  total_recipes: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Ajusta esta URL según tu backend (puerto, subruta, etc.)
  private baseUrl = 'http://localhost:8004';

  constructor(private http: HttpClient) {} 

  getRecipesByRating(min: number = 4, max: number = 5): Observable<Recipe[]> {
    const params = new HttpParams()
      .set('min_rating', min)
      .set('max_rating', max);
 
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/ratings/filter`, { params });
  }

  getTotalRecipeCount(): Observable<TotalRecipeCount> {
    return this.http.get<TotalRecipeCount>(
      `${this.baseUrl}/recipes/statistics/total`
    );
  }


}
