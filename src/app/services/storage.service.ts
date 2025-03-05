import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private data: any[] = [];

  constructor() {}

  saveItem(item: any) {
    this.data.push(item);
  }

  getItems() {
    return this.data;
  }
}
