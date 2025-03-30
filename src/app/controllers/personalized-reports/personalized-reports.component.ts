import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si necesitas redirigir al usuario
import { CommonModule } from '@angular/common'; // CommonModule

@Component({
  selector: 'app-personalized-reports',
  imports: [],
  templateUrl: './personalized-reports.component.html',
  styleUrl: './personalized-reports.component.scss'
})
export class PersonalizedReportsComponent {
 constructor(private router: Router) {}


  logout() {
    // Aquí puedes agregar la lógica de cierre de sesión
    console.log('Logging out...');
    
    // Si necesitas redirigir al usuario a la página de inicio de sesión después del logout:
    this.router.navigate(['/login']);
  }

  goToPersonalizedReports() {
    this.router.navigate(['/personalized-reports']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }

  goToTrendAnalysis() {
    this.router.navigate(['/trend-analysis']);
  }

  goToReports() {
    this.router.navigate(['/total-reports']);  // Redirige al dashboard
  }

  goToDetails() {
    this.router.navigate(['/details']);
  }
}
