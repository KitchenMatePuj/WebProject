import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si necesitas redirigir al usuario
import { CommonModule } from '@angular/common'; // CommonModule
import { FormsModule } from '@angular/forms';
import { Report, ReportService } from '../../services/report.service';

@Component({
  selector: 'app-total-reports',
  imports: [FormsModule, CommonModule],
  templateUrl: './total-reports.component.html',
  styleUrl: './total-reports.component.scss'
})

export class TotalReportsComponent {

// Variables para filtros
  reporter_user_id: string = "string";
  resource_type: string = "string";
description: string = "string";
status: string = "string";
created_at: Date = new Date("2025-04-07T05:30:53.044Z");
updated_at: Date = new Date("2025-04-07T05:30:53.044Z");

// Variable para almacenar los resultados
searchResults: Report[] = [];
isSearchActive: boolean = true;

clearFilters() {
throw new Error('Method not implemented.');
this.userTypeSearch = '';
this.statusSearch = '';
this.reportDateSearch = '';
this.searchResults = [];
}

reportTypeSearch: any;
userTypeSearch: any;
statusSearch: any;
reportDateSearch: any;
foundReports: any;

  constructor(private router: Router, private reportService: ReportService) {}

   // Método que se ejecuta al presionar el botón "Buscar"
    onSearch(): void {
      // Llama al servicio y pasa los filtros
      this.reportService.searchReports(
        this.userTypeSearch,
        this.statusSearch,
        this.reportDateSearch
      ).subscribe({
        next: (data: Report[]) => {
          // Actualiza los resultados y, al tener datos, el contenedor se mostrará
          this.searchResults = data;
          console.log('Resultados de búsqueda:', data);
        },
        error: (err: any) => {
          console.error('Error en la búsqueda:', err);
        }
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