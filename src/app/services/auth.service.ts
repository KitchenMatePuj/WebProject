import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private validUsers = [
    { username: 'admin', password: 'admin123' }, // ✅ Usuario válido
    { username: 'mod', password: 'mod123' }    // ✅ Otro usuario válido
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.validUsers.find(u => u.username === username && u.password === password);
    if (user) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true'); // ✅ Guarda sesión
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated'); // ✅ Elimina sesión
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
  }
}
