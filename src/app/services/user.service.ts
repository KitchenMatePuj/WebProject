import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'Ana López', email: 'ana@example.com' }
  ];

  constructor() {}

  getUsers() {
    return this.users;
  }
}
