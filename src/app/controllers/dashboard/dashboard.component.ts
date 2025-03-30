import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true
})
export class DashboardComponent {
  constructor(private router: Router) {}

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

  goToAllUsers() {
    this.router.navigate(['/all-users']);  // Redirige a la lista de todos los usuarios
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
