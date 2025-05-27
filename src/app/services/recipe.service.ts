import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

export interface Recipe {
  recipe_id: number;
  category_id: number;
  title: string;
  created_at: string;   
  updated_at: string;   
  cooking_time: number;
  food_type: string;
  total_portions: number;
  keycloak_user_id: string;
  rating_avg: number;
  ingredients?: string[];
}

export interface Comment {
  comment_id: number;
  user_name: string;
  comment_text: string;
  rating: number;
  created_at: string;
}


export interface TotalRecipeCount {
  total_recipes: number;
}

export interface Ingredient {
  name: string;
  measurement_unit: string;
  ingredient_id: number;
  recipe_id: number;
}


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = `${environment.recipeBaseUrl}`;

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
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/search`, { params });
   }
    getAllIngredients(): Observable<Ingredient[]> {
      return this.http.get<Ingredient[]>(`${this.baseUrl}/ingredients/`);
    }

    getAllRecipes(): Observable<Recipe[]> {
      return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/`);
    }

    getRecipeById(id: number) {
      return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}`);
    }
    
    getCommentsByRecipeId(recipeId: number): Observable<Comment[]> {
      return this.http.get<Comment[]>(`${this.baseUrl}/recipes/${recipeId}/comments`);
    }
    
    getRecipeSteps(recipeId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/recipes/${recipeId}/steps`);
    }

    getIngredientsByRecipeId(recipeId: number) {
      return this.http.get<any[]>(`${this.baseUrl}/recipes/${recipeId}/ingredients`);
    }
    
    
    
    
    
    

}
