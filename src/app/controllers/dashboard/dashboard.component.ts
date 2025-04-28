import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Profile, ProfileService, MostSaved } from '../../services/profile.service';
import { RecipeService, Recipe, TotalRecipeCount } from '../../services/recipe.service';
import { ChartOptions, ChartData, Chart, Plugin } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { forkJoin, catchError, of } from 'rxjs';

const centerTextPlugin: Plugin<'doughnut'> = {
  id: 'centerText',
  beforeDraw(chart) {
    const { ctx, config, chartArea } = chart;

    if ((config as { type: string }).type !== 'doughnut') return;

    const dataset = chart.data.datasets[0];
    const total = (dataset.data && dataset.data.length > 0) ? dataset.data.reduce((a: any, b: any) => a + b, 0) : 0;

    ctx.save();
    const fontSize = 18;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';

    const text = (total > 0) ? `Total: ${total}` : 'Sin Datos';

    const centerX = chartArea.left + (chartArea.right - chartArea.left) / 2;
    const centerY = chartArea.top + (chartArea.bottom - chartArea.bottom) / 2;

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
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recetas más guardadas' },
      centerText: {}
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
    maintainAspectRatio: false,
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
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        suggestedMin: 0,
        suggestedMax: 5,
        title: {
            display: true,
            text: 'Valoración promedio'
        }
      },
       y: {
        title: {
            display: true,
            text: 'Receta'
        }
       }
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Recetas con buena valoración (>= 4)'
      }
    }
  };

  hovering = false;
  currentSection = 'dashboard';

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
    this.loadMostSaved();

    this.recipeService.getRecipesByRating(4, 5).subscribe({
      next: (data: Recipe[]) => {
        console.log('Recetas Buena Valoración (datos raw):', data);
        this.recipes = data;

        const labels = data.map(r => r.title);
        const values = data.map(r => r.rating_avg);

        console.log('Datos procesados para Recetas Buena Valoración (Labels):', labels);
        console.log('Datos procesados para Recetas Buena Valoración (Values):', values);

        if (labels && labels.length > 0 && values && values.length > 0) {
          this.recipeRatingChartData.labels = labels;
          this.recipeRatingChartData.datasets[0].data = values;
          this.recipeRatingChartData = {...this.recipeRatingChartData};

          this.cdr.detectChanges();
          console.log('Recetas Buena Valoración: Datos asignados y CDR ejecutado.');
        } else {
           console.warn('Recetas Buena Valoración: No hay datos suficientes para graficar.');
           this.recipeRatingChartData.labels = [];
           this.recipeRatingChartData.datasets[0].data = [];
           this.recipeRatingChartData = {...this.recipeRatingChartData};
           this.cdr.detectChanges();
        }
      },
      error: (err: any) => {
        console.error('Error fetching recipes', err);
      }
    });

    this.recipeService.getTotalRecipeCount().subscribe({
      next: (data: TotalRecipeCount) => {
        console.log('Total de recetas cargado (raw):', data);
        this.totalCount = data;
         this.cdr.detectChanges();
         console.log('Total de recetas: Datos asignados y CDR ejecutado.');
      },
      error: (err: any) => {
        console.error('Error al cargar total de recetas', err);
      }
    });
  }

  loadMostSaved(): void {
      this.profileService.getMostSavedRecipes().subscribe({
        next: (data: { recipe_id: number; count: number }[]) => {
          console.log('Recetas Más Guardadas (datos iniciales raw):', data);

          if (!data || data.length === 0) {
            console.warn('Recetas Más Guardadas: No hay datos iniciales para procesar.');
             this.doughnutChartData.labels = [];
             this.doughnutChartData.datasets[0].data = [];
             this.doughnutChartData = {...this.doughnutChartData};
             this.cdr.detectChanges();
            return;
          }

          const recipeDetailsObservables = data.map(item =>
              this.recipeService.getRecipeById(item.recipe_id).pipe(
                  catchError(err => {
                      console.error(`Error al obtener detalle de receta ID ${item.recipe_id}:`, err);
                      return of(null);
                  })
              )
          );

          forkJoin(recipeDetailsObservables).subscribe({
              next: (recipesDetails: (Recipe | null)[]) => {
                  const labels: string[] = [];
                  const values: number[] = [];

                  recipesDetails.forEach((recipe, index) => {
                      const originalItem = data[index];
                      if (recipe) {
                          labels.push(recipe.title);
                          values.push(originalItem.count);
                      } else {
                          labels.push('Receta Desconocida (ID: ' + originalItem.recipe_id + ')');
                          values.push(originalItem.count);
                      }
                  });

                   console.log('Datos procesados para Recetas Más Guardadas (Labels):', labels);
                   console.log('Datos procesados para Recetas Más Guardadas (Values):', values);

                  if (labels.length > 0 && values.length > 0) {
                     this.doughnutChartData.labels = labels;
                     this.doughnutChartData.datasets[0].data = values;
                     this.doughnutChartData = {...this.doughnutChartData};

                     this.cdr.detectChanges();
                     console.log('Recetas Más Guardadas: Datos asignados y CDR ejecutado.');
                  } else {
                      console.warn('Recetas Más Guardadas: Los arrays de labels o values quedaron vacíos después de procesar.');
                       this.doughnutChartData.labels = [];
                       this.doughnutChartData.datasets[0].data = [];
                       this.doughnutChartData = {...this.doughnutChartData};
                       this.cdr.detectChanges();
                  }
              },
              error: (err) => {
                  console.error('Error en el forkJoin para obtener detalles de Recetas Más Guardadas:', err);
                   this.doughnutChartData.labels = [];
                   this.doughnutChartData.datasets[0].data = [];
                   this.doughnutChartData = {...this.doughnutChartData};
                   this.cdr.detectChanges();
              }
          });
        },
        error: (err) => {
          console.error('Error al cargar recetas más guardadas (inicial getMostSavedRecipes):', err);
           this.doughnutChartData.labels = [];
           this.doughnutChartData.datasets[0].data = [];
           this.doughnutChartData = {...this.doughnutChartData};
           this.cdr.detectChanges();
        }
      });
  }

  loadProfiles(): void {
    this.profileService.getAllProfiles().subscribe({
      next: (data: Profile[]) => {
        console.log('Usuarios por Estado (datos raw):', data);
        this.profiles = data;

        if (!data || data.length === 0) {
           console.warn('Usuarios por Estado: No hay datos iniciales de perfiles.');
            this.userStatusChartData.datasets[0].data = [];
            this.userStatusChartData = {...this.userStatusChartData};
            this.cdr.detectChanges();
           return;
        }

        const active = data.filter((p: any) => p.account_status === 'active').length;
        const inactive = data.filter((p: any) => p.account_status === 'inactive').length;

        console.log('Datos procesados para Usuarios por Estado (Activos, Inactivos):', [active, inactive]);

        this.userStatusChartData.datasets[0].data = [active, inactive];
        this.userStatusChartData = {...this.userStatusChartData};

        this.cdr.detectChanges();
        console.log('Usuarios por Estado: Datos asignados y CDR ejecutado.');

        if (active === 0 && inactive === 0) {
             console.warn('Usuarios por Estado: Ambos contadores (Activos/Inactivos) son cero, la gráfica podría no ser visible.');
        }
      },
      error: (err) => {
        console.error('Error al cargar perfiles:', err);
         this.userStatusChartData.datasets[0].data = [];
         this.userStatusChartData = {...this.userStatusChartData};
         this.cdr.detectChanges();
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
     console.log('Navegando a all-users');
   }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToRecipes(): void {
    this.router.navigate(['/recipes']);
  }

  goToComments(): void {
     console.log('Navegando a comments');
  }
}
