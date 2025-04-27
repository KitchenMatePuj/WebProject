import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService, Report } from '../../services/report.service';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  hovering = false;
  currentSection = 'comments';
  isSearchActive = true;

  // Filtros (enlazados con [(ngModel)])
  filters = {
    author: '',
    status: '',
    type: '',
    date: ''
  };

  // Datos
  originalResults: Report[] = [];
  filteredResults: Report[] = [];
  paginatedResults: Report[] = [];

  // Paginación
  currentPage: number = 1;
  pageSize: number = 9;
  pages: number[] = [];

  constructor(
    private router: Router,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    // Como no existe un getAll, hacemos una búsqueda sin filtros
    this.reportService.searchReports().subscribe({
      next: (data: Report[]) => {
        this.originalResults = data;
        this.filteredResults = [...data];
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al obtener comentarios:', err);
      }
    });
  }

  verDetalles(comentario: any) {
    this.router.navigate(['/details', comentario.id]);
  }
  

  applyFilters(): void {
    this.reportService.searchReports(
      this.filters.type,
      this.filters.status,
      this.filters.date
    ).subscribe({
      next: (data: Report[]) => {
        // Aquí puedes filtrar localmente si también quieres aplicar por autor
        this.filteredResults = this.filters.author
          ? data.filter(r =>
              r.reporter_user_id
                .toLowerCase()
                .includes(this.filters.author.toLowerCase())
            )
          : data;

        this.currentPage = 1;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al aplicar filtros:', err);
      }
    });
  }

  clearFilters(): void {
    this.filters = {
      author: '',
      status: '',
      type: '',
      date: ''
    };

    this.reportService.searchReports().subscribe({
      next: (data: Report[]) => {
        this.filteredResults = data;
        this.currentPage = 1;
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error al limpiar filtros:', err);
      }
    });
  }

  updatePagination(): void {
    const total = this.filteredResults.length;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedResults = this.filteredResults.slice(start, end);
    this.pages = Array.from({ length: Math.ceil(total / this.pageSize) }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

  // Navegación
  logout() {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  goToSearchUsers() {
    this.router.navigate(['/search-users']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  goToComments() {
    this.router.navigate(['/comments']);
  }
}
