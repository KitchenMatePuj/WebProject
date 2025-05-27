import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-payments',
  imports: [CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {

  constructor(private router: Router) {}


  logout() {
    console.log('Logging out...');
    
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



