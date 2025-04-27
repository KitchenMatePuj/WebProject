import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [CommonModule, NgIf],
  providers: [RecipeService]
})
export class DetailsComponent implements OnInit {
  recipe: any = null;  // ahora declaramos directamente la receta
  comments: any[] = [];
  steps: any[] = [];
  ingredients: any[] = [];




  hovering = false;
  currentSection = 'recipe'; // Sección actual (receta, comentarios, pasos, ingredientes)

  constructor(private router: Router, private recipeService: RecipeService) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state && nav.extras.state['recipe']) {
      this.recipe = nav.extras.state['recipe'];
      console.log('Receta recibida en constructor:', this.recipe);
  
      // 🔥 Ahora sí traemos los comentarios reales
      this.recipeService.getCommentsByRecipeId(this.recipe.recipe_id).subscribe({
        next: (data) => {
          this.comments = data;
          console.log('Comentarios recibidos:', this.comments);
        },
        error: (err) => {
          console.error('Error cargando comentarios:', err);
        }
      });

      this.recipeService.getRecipeSteps(this.recipe.recipe_id).subscribe({
        next: (data) => {
          this.steps = data;
          console.log('Pasos recibidos:', this.steps);
      
          // 🔥 Concatenamos los pasos separados por saltos de línea <br>
          const descriptions = this.steps.map(step => step.description);
          this.recipe.description = descriptions.join('<br>');
        },
        error: (err) => {
          console.error('Error cargando pasos:', err);
        }
      });

      this.recipeService.getAllIngredients().subscribe({
        next: (data) => {
          this.ingredients = data.filter(ingredient => ingredient.recipe_id === this.recipe.recipe_id);
          console.log('Ingredientes recibidos:', this.ingredients);
        },
        error: (err) => {
          console.error('Error cargando ingredientes:', err);
        }
      });
      

    } else {
      console.error('No se encontró receta, volviendo a recipes...');
      this.router.navigate(['/recipes']);
    }
  }

  ngOnInit(): void {

  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToSearchUsers() {
    this.router.navigate(['/search-users']);
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  goToComments() {
    this.router.navigate(['/comments']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
