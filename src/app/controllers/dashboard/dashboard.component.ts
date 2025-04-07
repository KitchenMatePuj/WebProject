import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Profile, ProfileService, MostSaved } from '../../services/profile.service';
import { RecipeService, Recipe, TotalRecipeCount } from '../../services/recipe.service';
import { MostSavedDonutComponent } from '../most-saved-donut/most-saved-donut.component';
import { ChartOptions, ChartData, Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

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

     // IMPORTANTE: Usar 'doughnut' en vez de 'pie'
  mostSavedDonutData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      label: 'Recetas más guardadas',
      data: [], // se llenará en loadMostSaved()
      backgroundColor: [
        '#66BB6A', // color 1
        '#FFCA28', // color 2
        '#29B6F6', // color 3
        '#EF5350', // color 4
        '#AB47BC', // color 5
      ]
    }]
  };

  mostSavedDonutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    // cutout crea el agujero interno (dona)
    cutout: '60%',
    plugins: {
      legend: { position: 'top' },
      title: { display: false }
    }
  };

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
      },
      error: (err: any) => {
        console.error('Error fetching recipes', err);
      }
    });
    this.recipeService.getTotalRecipeCount().subscribe({
      next: (data: TotalRecipeCount) => {
        this.totalCount = data;
      },
      error: (err: any) => {
        console.error('Error fetching total recipe count', err);
      }
    });
  }


  loadMostSaved(): void {
        this.profileService.getMostSavedRecipes().subscribe({
      next: (data: MostSaved[]) => {
        this.mostSaved = data;
        console.log('Most saved recipes:', this.mostSaved);
        // Actualiza las etiquetas y los datos del gráfico
        this.mostSavedDonutData.labels = data.map(item => item.title);
        this.mostSavedDonutData.datasets[0].data = data.map(item => item.count);
      },
      error: (err: any) => {
        console.error('Error fetching most saved recipes', err);
      }
    });
  }

  


  loadProfiles(): void {
    this.profileService.getAllProfiles().subscribe({
      next: (data) => {
        this.profiles = data;
        console.log('Perfiles cargados:', this.profiles);
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
