import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { tick } from '@angular/core/testing';
@Component({
  selector: 'app-trend-analysis',
  imports: [],
  templateUrl: './trend-analysis.component.html',
  styleUrl: './trend-analysis.component.scss'
})
export class TrendAnalysisComponent {

  constructor(private router: Router) {}


  logout() {
    
    console.log('Logging out...');
    
    this.router.navigate(['/login']);
  }

goToPersonalizedReports() {
  this.router.navigate(['/personalized-reports']);
}

goToTrendAnalysis() {
  this.router.navigate(['/trend-analysis']);
}

  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }


  goToDetails() {
    this.router.navigate(['/details']);
  }
}
