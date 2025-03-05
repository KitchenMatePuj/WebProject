import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  goToSearchUsers() {
    this.router.navigate(['/search-users']);  // Redirige a la lista de todos los usuarios
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);  // Redirige al dashboard
  }
  
  goToRecipes() {
    this.router.navigate(['/recipes']);  // Redirige al dashboard
  }
  
  goToComments() {
    this.router.navigate(['/comments']);  // Redirige a los comentarios
  }  
}
