import { Routes } from '@angular/router';
import { LoginViewComponent } from './controllers/auth/login-view/login-view.component';
import { FirmaViewComponent } from './controllers/firma/firma-view/firma-view.component';
import { ActuacionViewComponent } from './controllers/actuacion/actuacion-view/actuacion-view.component';
import { ProcessViewComponent } from './controllers/process/process-view/process-view.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './controllers/dashboard/dashboard.component';
import { ProfileComponent } from './controllers/profile/profile.component';  // Asegúrate de crear este componente
import { SearchUsersComponent } from './controllers/search-users/search-users.component';  // Asegúrate de crear este componente
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component'; 
import { RecipesComponent } from './controllers/recipes/recipes.component';
import { CommentsComponent } from './controllers/comments/comments.component';
import { CampaignSearchComponent } from './controllers/campaign-search/campaign-search.component';
import { CampaignCreationComponent } from './controllers/campaign-creation/campaign-creation.component';
import { PerformanceReportComponent } from './controllers/performance-report/performance-report.component';
import { PaymentsComponent } from './controllers/payments/payments.component';
import { TotalReportsComponent } from './controllers/total-reports/total-reports.component';
import { DetailsComponent } from './controllers/details/details.component';
import { TrendAnalysisComponent } from './controllers/trend-analysis/trend-analysis.component';




export const routes: Routes = [
    { path: 'login', component: LoginViewComponent },
    { path: 'firma', component: FirmaViewComponent, canActivate: [AuthGuard] },
    { path: 'actuacion', component: ActuacionViewComponent, canActivate: [AuthGuard] },
    { path: 'process', component: ProcessViewComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, 
    { path: 'profile', component: ProfileComponent }, 
    { path: 'search-users', component: SearchUsersComponent, canActivate: [AuthGuard] },
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard]},
    { path: 'comments', component: CommentsComponent, canActivate: [AuthGuard]},
    { path: 'campaign-search', component: CampaignSearchComponent, canActivate: [AuthGuard]},
    { path: 'campaign-creation', component: CampaignCreationComponent, canActivate: [AuthGuard]},
    { path: 'performance-report', component: PerformanceReportComponent, canActivate: [AuthGuard]},
    { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard]},
    { path: 'total-reports', component: TotalReportsComponent, canActivate: [AuthGuard]},
    { path: 'details', component: DetailsComponent, canActivate: [AuthGuard]},
    { path: 'trend-analysis', component: TrendAnalysisComponent, canActivate: [AuthGuard]},

    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];

  export const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'search-users', component: SearchUsersComponent },
  ];