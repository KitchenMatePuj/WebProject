import { Routes } from '@angular/router';
import { LoginViewComponent } from './controllers/auth/login-view/login-view.component';
import { UserViewComponent } from './controllers/user/user-view/user-view.component';
import { StorageViewComponent } from './controllers/storage/storage-view/storage-view.component';
import { FirmaViewComponent } from './controllers/firma/firma-view/firma-view.component';
import { ActuacionViewComponent } from './controllers/actuacion/actuacion-view/actuacion-view.component';
import { ProcessViewComponent } from './controllers/process/process-view/process-view.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './controllers/dashboard/dashboard.component';
import { ProfileComponent } from './controllers/profile/profile.component';  // Asegúrate de crear este componente
import { SearchUsersComponent } from './controllers/search-users/search-users.component';  // Asegúrate de crear este componente
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AllUsersComponent } from './controllers/all-users/all-users.component';  // Asegúrate de crear este componente
import { RecipesComponent } from './controllers/recipes/recipes.component';
import { CommentsComponent } from './controllers/comments/comments.component';
import { AllRecipesComponent } from './controllers/all-recipes/all-recipes.component';
import { AllCommentsComponent } from './controllers/all-comments/all-comments.component';




export const routes: Routes = [
    { path: 'login', component: LoginViewComponent },
    { path: 'user', component: UserViewComponent, canActivate: [authGuard] },
    { path: 'storage', component: StorageViewComponent, canActivate: [authGuard] },
    { path: 'firma', component: FirmaViewComponent, canActivate: [authGuard] },
    { path: 'actuacion', component: ActuacionViewComponent, canActivate: [authGuard] },
    { path: 'process', component: ProcessViewComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, 
    { path: 'profile', component: ProfileComponent }, 
    { path: 'search-users', component: SearchUsersComponent, canActivate: [authGuard] },
    { path: 'all-users', component: AllUsersComponent, canActivate: [authGuard] },
    { path: 'recipes', component: RecipesComponent, canActivate: [authGuard]},
    { path: 'comments', component: CommentsComponent, canActivate: [authGuard]},
    { path: 'all-recipes', component: AllRecipesComponent, canActivate: [authGuard]},
    { path: 'all-comments', component: AllCommentsComponent, canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];

  export const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'search-users', component: SearchUsersComponent },
  ];