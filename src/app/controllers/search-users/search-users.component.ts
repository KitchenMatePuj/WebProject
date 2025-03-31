import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Si necesitas redirigir al usuario
import { CommonModule } from '@angular/common'; // CommonModule
import { FormsModule } from '@angular/forms';
import { Profile, ProfileService } from '../../services/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { Ingredient, RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-search-users',
  standalone: true,  // Definido como componente standalone
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class SearchUsersComponent {

  firstNameSearch: string = '';
  lastNameSearch: string = '';
  emailSearch: string = '';
  accountStatusSearch: string = '';
  allergyNameSearch: string = '';

  ingredients: Ingredient[] = []; // Cambia el tipo según tu modelo de datos

  userIds: string[] = []; 

  foundProfiles: Profile[] = [];

  isSearchActive: boolean = true;

  constructor(private router: Router, public profileService: ProfileService, public RecipeService:RecipeService) {}

  ngOnInit(): void {
    this.loadIngredients();
  }
  

  searchUsers() {
    this.profileService.getProfilesBySearch(
      this.firstNameSearch,
      this.lastNameSearch,
      this.emailSearch,
      this.accountStatusSearch,
      this.allergyNameSearch
    ).subscribe((ids: string[]) => {
      this.userIds = ids;
      this.foundProfiles = [];
  
      ids.forEach(id => {
        this.profileService.getProfileByKeycloak(id).subscribe((profile) => {
          this.foundProfiles.push(profile);
        });
      });
    });
  }

  loadIngredients() {
    this.RecipeService.getAllIngredients().subscribe({
      next: (data) => {
        this.ingredients = data;
      },
      error: (err) => {
        console.error("Error cargando ingredientes", err);
      }
    });
  }

  clearForm() {
    this.firstNameSearch = '';
    this.lastNameSearch = '';
    this.emailSearch = '';
    this.accountStatusSearch = '';
    this.allergyNameSearch = '';
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  logout() {
    // Aquí puedes agregar la lógica de cierre de sesión
    console.log('Logging out...');
    
    // Si necesitas redirigir al usuario a la página de inicio de sesión después del logout:
    this.router.navigate(['/login']);
  }

  goToSearchUsers() {
    this.router.navigate(['/search-users']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);  // Redirige al perfil del admin
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);  // Redirige al dashboard
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);  // Redirige a las recetas
  }

  goToComments() {
    this.router.navigate(['/comments']);  // Redirige a los comentarios
  }
}
