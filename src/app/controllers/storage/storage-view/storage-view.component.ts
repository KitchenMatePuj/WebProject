import { Component } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { NgFor } from '@angular/common'; // ✅ Importar NgFor


@Component({
  selector: 'app-storage-view',
  templateUrl: './storage-view.component.html',
  styleUrls: ['./storage-view.component.scss'],
  standalone: true, // ✅ Es un componente independiente
  imports: [NgFor] // ✅ Importar NgFor para usar *ngFor
})
export class StorageViewComponent {
  items: any[] = [];

  constructor(private storageService: StorageService) {
    this.items = this.storageService.getItems();
  }

  addItem(item: string) {
    if (item.trim()) {
      this.storageService.saveItem(item);
      this.items = this.storageService.getItems();
    }
  }
}
