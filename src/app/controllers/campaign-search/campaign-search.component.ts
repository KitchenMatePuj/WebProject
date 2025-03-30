import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si necesitas redirigir al usuario
import { CommonModule } from '@angular/common'; // CommonModule

@Component({
  selector: 'app-campaign-search',
  imports: [CommonModule],
  templateUrl: './campaign-search.component.html',
  styleUrl: './campaign-search.component.scss'
})
export class CampaignSearchComponent {

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

  goToCampaignSearch() {
    this.router.navigate(['/campaign-search']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }

  goToReports() {
    this.router.navigate(['/performance-report']);  // Redirige al dashboard
  }

  goToPayments() {
    this.router.navigate(['/payments']);  // Redirige a la lista de todos los usuarios
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);  // Redirige a las recetas
  }

  goToComments() {
    this.router.navigate(['/comments']);  // Redirige a los comentarios
  }
}


