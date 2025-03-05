import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; // ✅ Importar NgFor

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  standalone: true,
  imports: [NgFor] // ✅ Importar NgFor para usar *ngFor
})
export class UserViewComponent {
  users = [
    { name: 'Juan Pérez', email: 'juan@example.com' },
    { name: 'Ana López', email: 'ana@example.com' }
  ];
}
