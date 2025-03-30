import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si necesitas redirigir al usuario
import { CommonModule } from '@angular/common'; // CommonModule

@Component({
  selector: 'app-total-reports',
  imports: [],
  templateUrl: './total-reports.component.html',
  styleUrl: './total-reports.component.scss'
})
export class TotalReportsComponent {

  constructor(private router: Router) {}


  logout() {
    // Aquí puedes agregar la lógica de cierre de sesión
    console.log('Logging out...');
    
    // Si necesitas redirigir al usuario a la página de inicio de sesión después del logout:
    this.router.navigate(['/login']);
  }



  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }

  goToReports() {
    this.router.navigate(['/total-reports']);  // Redirige al dashboard
  }

  goToDetails() {
    this.router.navigate(['/details']);
  }


}




