import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // CommonModule
import { Recipe, RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {



// Variables para filtros
    titleFilter: string = '';
    cookingTimeFilter?: number;
    ingredientFilter: string = '';
  
    // Variable para almacenar los resultados
    searchResults: Recipe[] = [];
  isSearchActive: boolean = true;

  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
  }

    // Método opcional para limpiar los filtros y resultados
    clearFilters(): void {
      this.titleFilter = '';
      this.cookingTimeFilter = undefined;
      this.ingredientFilter = '';
      this.searchResults = [];
    }


  // Método que se ejecuta al presionar el botón "Buscar"
  onSearch(): void {
    // Llama al servicio y pasa los filtros
    this.recipeService.searchRecipes(
      this.titleFilter,
      this.cookingTimeFilter,
      this.ingredientFilter
    ).subscribe({
      next: (data: Recipe[]) => {
        // Actualiza los resultados y, al tener datos, el contenedor se mostrará
        this.searchResults = data;
        console.log('Resultados de búsqueda:', data);
      },
      error: (err: any) => {
        console.error('Error en la búsqueda:', err);
      }
    });
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }
    goToSearchUsers() {
    this.router.navigate(['/search-users']);  // Redirige a la lista de todos los usuarios
  }

  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);  // Redirige al dashboard
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  goToComments() {
    this.router.navigate(['/comments']);
  }
}
