import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';
import { ReportService, Report } from '../../services/report.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit {

  // Estado del menú lateral
  hovering = false;
  currentSection = 'recipes';

  // Control de búsqueda
  isSearchActive: boolean = true;

  // Filtros
  filters = {
    title: '',
    cookingTime: '',
    ingredient: ''
  };

  // Datos
  originalResults: Recipe[] = [];
  filteredResults: Recipe[] = [];
  paginatedResults: Recipe[] = [];

  // Paginación
  currentPage: number = 1;
  pageSize: number = 9;
  pages: number[] = [];
  comment: any;

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.originalResults = data;
        this.filteredResults = [...data];
        this.updatePagination();
      },
      error: (err: any) => {
        console.error('Error al obtener recetas:', err);
      }
    });
  }

  verDetalles(recipe: any) {
    console.log('Receta enviada:', recipe);
    this.router.navigate(['/details'], { state: { recipe: recipe } });
  }
  


  applyFilters(): void {
    this.recipeService.searchRecipes(
      this.filters.title,
      this.filters.cookingTime ? +this.filters.cookingTime : undefined,
      this.filters.ingredient
    ).subscribe({
      next: (data: Recipe[]) => {
        this.filteredResults = data;
        this.currentPage = 1;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al aplicar filtros:', err);
      }
    });
  }
  
  

  clearFilters(): void {
    this.filters = { title: '', cookingTime: '', ingredient: '' };
    this.recipeService.getAllRecipes().subscribe({
      next: (data: Recipe[]) => {
        this.filteredResults = data;
        this.currentPage = 1;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al limpiar filtros:', err);
      }
    });
  }
  

  updatePagination(): void {
    const total = this.filteredResults.length;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedResults = this.filteredResults.slice(start, end);
    this.pages = Array.from({ length: Math.ceil(total / this.pageSize) }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

  // Navegación
  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  goToSearchUsers() {
    this.router.navigate(['/search-users']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  goToComments() {
    this.router.navigate(['/comments']);
  }
}
