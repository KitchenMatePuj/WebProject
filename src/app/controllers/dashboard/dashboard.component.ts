import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Profile, ProfileService, MostSaved } from '../../services/profile.service';
import { RecipeService, Recipe, TotalRecipeCount } from '../../services/recipe.service';
import { ChartOptions, ChartData, Chart, Plugin } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

// 🔸 Plugin para mostrar texto en el centro de la dona
const centerTextPlugin: Plugin<'doughnut'> = {
  id: 'centerText',
  beforeDraw(chart) {
    const { ctx, config, chartArea } = chart;

    if ((config as { type: string }).type !== 'doughnut') return;

    const dataset = chart.data.datasets[0];
    const total = dataset.data.reduce((a: any, b: any) => a + b, 0);

    ctx.save();
    const fontSize = 18;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';

    const text = `Total: ${total}`;
    const centerX = chartArea.left + (chartArea.right - chartArea.left) / 2;
    const centerY = chartArea.top + (chartArea.bottom - chartArea.top) / 2;

    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  }
};

Chart.register(centerTextPlugin);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, NgChartsModule]
})
export class DashboardComponent implements OnInit {
  profiles: Profile[] = [];
  mostSaved: MostSaved[] = [];
  recipes: Recipe[] = [];
  totalCount!: TotalRecipeCount;

  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#A3C9A8', '#FFD6A5', '#FFB5E8', '#B5EAD7', '#C7CEEA', '#FFDAC1', '#E2F0CB'
      ]
    }]
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recetas más guardadas' }
    }
  };

  userStatusChartData: ChartData<'pie'> = {
    labels: ['Activos', 'Inactivos'],
    datasets: [{
      label: 'Usuarios registrados',
      data: [],
      backgroundColor: ['#A3C9A8', '#FFDAC1']
    }]
  };

  userStatusChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Estado de cuentas registradas'
      }
    }
  };

  recipeRatingChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Valoración',
      data: [],
      backgroundColor: '#A3C9A8'
    }]
  };

  recipeRatingChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 5
      }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Recetas con buena valoración'
      }
    }
  };

  hovering = false;
  currentSection = 'dashboard';

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
    this.loadMostSaved();
    this.recipeService.getRecipesByRating(4, 5).subscribe({
      next: (data: Recipe[]) => {
        this.recipes = data;
        this.recipeRatingChartData.labels = data.map(r => r.title);
        this.recipeRatingChartData.datasets[0].data = data.map(r => r.rating_avg);
      },
      error: (err: any) => {
        console.error('Error fetching recipes', err);
      }
    });
    this.recipeService.getTotalRecipeCount().subscribe({
      next: (data: TotalRecipeCount) => {
        this.totalCount = data;
        console.log('Total de recetas cargado:', data);
      },
      error: (err: any) => {
        console.error('Error al cargar total de recetas', err);
      }
    });    
  }

  loadMostSaved(): void {
    this.profileService.getMostSavedRecipes().subscribe({
      next: (data: { recipe_id: number; count: number }[]) => {
        const labels: string[] = [];
        const values: number[] = [];
        let completedRequests = 0;

        data.forEach((item, index) => {
          this.recipeService.getRecipeById(item.recipe_id).subscribe({
            next: (recipe) => {
              labels[index] = recipe.title;
              values[index] = item.count;
            },
            error: () => {
              labels[index] = 'Desconocido';
              values[index] = item.count;
            },
            complete: () => {
              completedRequests++;
              if (completedRequests === data.length) {
                this.doughnutChartData.labels = labels;
                this.doughnutChartData.datasets[0].data = values;
              }
            }
          });
        });
      },
      error: (err) => {
        console.error('Error al cargar recetas más guardadas', err);
      }
    });
  }

  loadProfiles(): void {
    this.profileService.getAllProfiles().subscribe({
      next: (data) => {
        this.profiles = data;

        const active = data.filter(p => p.account_status === 'active').length;
        const inactive = data.filter(p => p.account_status === 'inactive').length;

        this.userStatusChartData.datasets[0].data = [active, inactive];
      },
      error: (err) => {
        console.error('Error al cargar perfiles', err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToSearchUsers(): void {
    this.router.navigate(['/search-users']);
  }

  goToAllUsers(): void {
    this.router.navigate(['/all-users']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToRecipes(): void {
    this.router.navigate(['/recipes']);
  }

  goToComments(): void {
    this.router.navigate(['/comments']);
  }
}
