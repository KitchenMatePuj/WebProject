import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si necesitas redirigir al usuario
import { CommonModule } from '@angular/common'; // CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-total-reports',
  imports: [FormsModule, CommonModule],
  templateUrl: './total-reports.component.html',
  styleUrl: './total-reports.component.scss'
})
export class TotalReportsComponent {
  reportService: any;
  reportIdSearch: undefined;
clearFilters() {
throw new Error('Method not implemented.');
}
reportTypeSearch: any;
userTypeSearch: any;
statusSearch: any;
reportDateSearch: any;
foundReports: any;

  constructor(private router: Router) {}

  searchReports(): void {
    const filters = {
      reportType: this.reportTypeSearch,
      status: this.statusSearch,
      reportDate: this.reportDateSearch,
    };

    this.reportService.searchReports(filters).subscribe({
      next: (data: any) => {
        this.foundReports = data;
        console.log('Reportes encontrados:', data);
      },
      error: (err: any) => {
        console.error('Error al buscar reportes:', err);
      },
    });
  }

  


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




