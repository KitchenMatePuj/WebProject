import { Component } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-storage-component',
  templateUrl: './storage-component.component.html',
  styleUrls: ['./storage-component.component.scss']
})
export class StorageComponent {
  items: any[] = [];

  constructor(private storageService: StorageService) {
    this.items = this.storageService.getItems();
  }

  addItem(item: string) {
    this.storageService.saveItem(item);
    this.items = this.storageService.getItems();
  }
}
