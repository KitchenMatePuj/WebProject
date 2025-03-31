import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Profile, ProfileService } from '../../services/profile.service';
import { MostSaved } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe, TotalRecipeCount } from '../../services/recipe.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  profiles: Profile[] = [];
  mostSaved: MostSaved[] = [];
  recipes: Recipe[] = [];
  totalCount!: TotalRecipeCount;

  constructor(private router: Router, private profileService: ProfileService, private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
    this.loadMostSaved();
    this.recipeService.getRecipesByRating(4, 5).subscribe({
      next: (data: Recipe[]) => {
        this.recipes = data;
      },
      error: (err: any) => {
        console.error('Error fetching recipes', err);
      }
    });
    this.recipeService.getTotalRecipeCount().subscribe({
      next: (data: TotalRecipeCount) => {
        this.totalCount = data;
      },
      error: (err: any) => {
        console.error('Error fetching total recipe count', err);
      }
    });
  }
  

  loadMostSaved() {
    this.profileService.getMostSavedRecipes().subscribe({
      next: (data: MostSaved[]) => {
        this.mostSaved = data;
        console.log('Most saved recipes:', this.mostSaved);
      },
      error: (err: any) => {
        console.error('Error:', err);
      }
    });
  }

  // Llamada al servicio para traer todos los perfiles
  loadProfiles(): void {
    this.profileService.getAllProfiles().subscribe({
      next: (data) => {
        this.profiles = data;
        console.log('Perfiles cargados:', this.profiles);
      },
      error: (err) => {
        console.error('Error al cargar perfiles', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }

  goToSearchUsers() {
    this.router.navigate(['/search-users']);  // Redirige a la lista de usuarios
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);  // Redirige al dashboard
  }
  
  goToRecipes() {
    this.router.navigate(['/recipes']);  // Redirige a las recetas
  }
  
  goToComments() {
    this.router.navigate(['/comments']);  // Redirige a los comentarios
  }    
}
