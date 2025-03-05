import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // CommonModule


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  imports: [CommonModule]
})
export class AllUsersComponent {

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
}
