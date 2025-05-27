import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profile, ProfileService } from '../../services/profile.service';
import { HttpClientModule } from '@angular/common/http';
import { Ingredient, RecipeService } from '../../services/recipe.service';


@Component({
  selector: 'app-search-users',
  standalone: true,  
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
  updatedAtSearch: string = '';

  ingredients: Ingredient[] = [];

  userIds: string[] = []; 

  foundProfiles: Profile[] = [];

  isSearchActive: boolean = true;

  constructor(private router: Router, public profileService: ProfileService, public RecipeService:RecipeService) {}

  ngOnInit(): void {
    this.loadIngredients();
    this.searchUsers(); // Llama a la función de búsqueda al iniciar el componente

  }

      clearFilters(): void {
        this.firstNameSearch = '';
        this.lastNameSearch = '';
        this.emailSearch = '';
        this.accountStatusSearch = '';
        this.foundProfiles = [];

        this.searchUsers(); // Llama a la función de búsqueda después de limpiar los filtros
      }

  hovering = false; // Variable para controlar el hover
  currentSection = 'search-users'; 


  searchUsers(): void {
    const noFilters =
      !this.firstNameSearch &&
      !this.lastNameSearch &&
      !this.emailSearch &&
      !this.accountStatusSearch;
  
    if (noFilters) {
      // Traer todos los perfiles si no hay filtros
      this.profileService.getAllProfiles().subscribe((profiles: Profile[]) => {
        this.foundProfiles = profiles;
      });
      return;
    }
  
    // Caso con filtros aplicados
    this.profileService.getProfilesBySearch(
      this.firstNameSearch,
      this.lastNameSearch,
      this.emailSearch,
      this.accountStatusSearch,
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



  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  logout() {
    console.log('Logging out...');
    
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


  // Paginación
currentPage: number = 1;
itemsPerPage: number = 7;

get paginatedProfiles(): Profile[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.foundProfiles.slice(start, end);
}

get totalPages(): number {
  return Math.ceil(this.foundProfiles.length / this.itemsPerPage);
}

changePage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

}
