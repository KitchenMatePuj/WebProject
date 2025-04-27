
import { Report, ReportService } from '../../services/report.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-total-reports',
  templateUrl: './total-reports.component.html',
  styleUrls: ['./total-reports.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class TotalReportsComponent {
  // Sidebar
  hovering = false;

  // Filtros
  reportTypeSearch: string = '';
  statusSearch: string = '';
  reportDateSearch: string = '';

  // Datos
  foundReports: Report[] = [];
  paginatedReports: Report[] = [];

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(
    private router: Router,
    private reportService: ReportService
  ) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToReports() {
    this.router.navigate(['/total-reports']);
  }
  
  logout(): void {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  // 🔎 Método que se ejecuta al presionar "Buscar"
  onSearch(): void {
    this.reportService.searchReports(
      this.reportTypeSearch,
      this.statusSearch,
      this.reportDateSearch
    ).subscribe({
      next: (data: Report[]) => {
        this.foundReports = data;
        console.log('Resultados de búsqueda:', data);

        this.currentPage = 1;
        this.applyFilters();
      },
      error: (err: any) => {
        console.error('Error en la búsqueda:', err);
      }
    });
  }

  applyFilters() {
    let filtered = [...this.foundReports];
  
    if (this.reportTypeSearch) {
      filtered = filtered.filter(report => report.resource_type === this.reportTypeSearch);
    }
  
    if (this.statusSearch) {
      filtered = filtered.filter(report => report.status === this.statusSearch);
    }
  
    if (this.reportDateSearch) {
      filtered = filtered.filter(report => {
        // Normalizamos fecha: comparamos solo el día (sin horas)
        const reportDate = new Date(report.created_at).toISOString().split('T')[0];
        return reportDate === this.reportDateSearch;
      });
    }
  
    this.updatePagination(filtered);
  }
  

  clearFilters() {
    this.reportTypeSearch = '';
    this.statusSearch = '';
    this.reportDateSearch = '';
    this.onSearch(); // Vuelve a cargar datos limpiando filtros
  }

  updatePagination(data: Report[]) {
    this.totalPages = Math.ceil(data.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((_, i) => i + 1);
    this.paginatedReports = data.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginatedReports = this.paginatedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginatedReports = this.paginatedData();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginatedReports = this.paginatedData();
  }

  paginatedData(): Report[] {
    return this.filteredResults().slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  filteredResults(): Report[] {
    let filtered = [...this.foundReports];
  
    if (this.reportTypeSearch) {
      filtered = filtered.filter(report => report.resource_type === this.reportTypeSearch);
    }
    if (this.statusSearch) {
      filtered = filtered.filter(report => report.status === this.statusSearch);
    }
    if (this.reportDateSearch) {
      filtered = filtered.filter(report => {
        const reportDate = new Date(report.created_at).toISOString().split('T')[0];
        return reportDate === this.reportDateSearch;
      });
    }
  
    return filtered;
  }
  currentSection: string = 'reports'; // 🔥 Para indicar que estamos en "Reportes"
  

  goToDetails(id: number) {
    console.log('Navegar al detalle de reporte con ID:', id);
    this.router.navigate(['/details', id]);
  }
}
