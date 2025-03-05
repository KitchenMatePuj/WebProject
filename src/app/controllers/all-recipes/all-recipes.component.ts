import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // CommonModule

@Component({
  selector: 'app-all-recipes',
  imports: [CommonModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent {

  isSearchActive: boolean = true;

   constructor(private router: Router) {}
  
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
      this.router.navigate(['/recipes'])   // Redirige a recetas
    }
  
    goToComments() {
      this.router.navigate(['/comments'])   // Redirige a recetas
    }
}
