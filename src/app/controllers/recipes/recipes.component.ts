import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // CommonModule

@Component({
  selector: 'app-recipes',
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  isSearchActive: boolean = true;

  constructor(private router: Router) {}

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

  goToAllRecipes() {
    this.router.navigate(['/all-recipes']);
  }
}
