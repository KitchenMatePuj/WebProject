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

export interface Ingredient {
  name: string;
  measurement_unit: string;
  ingredient_id: number;
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Ajusta esta URL según tu backend (puerto, subruta, etc.)
  private baseUrl = 'http://localhost:8001';

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
   /**
   * Busca recetas usando filtros opcionales.
   * @param title Filtro por título (opcional)
   * @param cooking_time Filtro por tiempo de cocción (opcional)
   * @param ingredient Filtro por ingrediente (opcional)
   */
   searchRecipes(title?: string, cooking_time?: number, ingredient?: string): Observable<Recipe[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    if (cooking_time) {
      params = params.set('cooking_time', cooking_time.toString());
    }
    if (ingredient) {
      params = params.set('ingredient', ingredient);
    }
    // El endpoint según OpenAPI es /recipes/search
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/search`, { params });
   }
    getAllIngredients(): Observable<Ingredient[]> {
      return this.http.get<Ingredient[]>(`${this.baseUrl}/ingredients/`);
    }


}
