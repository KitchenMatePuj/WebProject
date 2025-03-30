import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si necesitas redirigir al usuario
import { CommonModule } from '@angular/common'; // CommonModule

@Component({
  selector: 'app-search-users',
  standalone: true,  // Definido como componente standalone
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
  imports: [CommonModule]
})
export class SearchUsersComponent {

  isSearchActive: boolean = true;

  constructor(private router: Router) {}

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  logout() {
    // Aquí puedes agregar la lógica de cierre de sesión
    console.log('Logging out...');
    
    // Si necesitas redirigir al usuario a la página de inicio de sesión después del logout:
    this.router.navigate(['/login']);
  }

  goToSearchUsers() {
    this.router.navigate(['/search-users']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);  // Redirige al dashboard
  }

  goToAllUsers() {
    this.router.navigate(['/all-users']);  // Redirige a la lista de todos los usuarios
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);  // Redirige a las recetas
  }

  goToComments() {
    this.router.navigate(['/comments']);  // Redirige a los comentarios
  }
}
