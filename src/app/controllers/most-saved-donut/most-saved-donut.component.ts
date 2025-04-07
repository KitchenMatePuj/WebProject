import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { ProfileService, MostSaved } from '../../services/profile.service';

@Component({
  selector: 'app-most-saved-donut',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './most-saved-donut.component.html',
  styleUrls: ['./most-saved-donut.component.scss']
})
export class MostSavedDonutComponent implements OnInit {
  // Usamos 'doughnut' para obtener un gráfico tipo donut
  chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'var(--color-chrome)',
        'var(--color-safari)',
        'var(--color-firefox)',
        'var(--color-edge)',
        'var(--color-other)'
      ]
    }]
  };

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '60%', // Esto crea el efecto donut (hueco central)
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recetas más guardadas' }
    }
  };

  totalCount: number = 0;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadMostSavedData();
  }

  loadMostSavedData(): void {
    this.profileService.getMostSavedRecipes().subscribe({
      next: (data: MostSaved[]) => {
        // Asigna las etiquetas y los datos del gráfico según lo que retorne el backend
        this.chartData.labels = data.map(item => item.title);
        this.chartData.datasets[0].data = data.map(item => item.count);
        this.totalCount = data.reduce((acc, item) => acc + item.count, 0);
      },
      error: (err) => {
        console.error('Error al cargar las recetas más guardadas:', err);
      }
    });
  }
}
