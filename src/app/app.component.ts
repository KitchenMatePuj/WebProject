import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // ✅ Importar RouterModule
import { CommonModule } from '@angular/common'; // ✅ Importar NgIf


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule] // ✅ Agregar NgIf y CommonModule
})
export class AppComponent {
  isLoginPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }
}
