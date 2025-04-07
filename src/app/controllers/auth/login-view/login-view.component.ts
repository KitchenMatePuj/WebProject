import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub?: string;
  preferred_username?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
}

@Component({
  standalone: true,
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  imports: [FormsModule, CommonModule],
})

export class LoginViewComponent {
  username = '';
  password = '';
  passwordFieldType = 'password';
  passwordIcon = '/assets/icons/invisible.svg';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
    this.passwordIcon =
      this.passwordFieldType === 'password'
        ? '/assets/icons/invisible.svg'
        : '/assets/icons/visible.svg';
  }

  login() {
    console.log('Intentando iniciar sesión con:', this.username, this.password);

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);

        const token = response.access_token;
        if (!token) {
          alert('Token no recibido');
          return;
        }

        this.authService.saveToken(token);

        const decoded = jwtDecode<DecodedToken>(token);
        console.log('Token decodificado:', decoded);

        const userId = decoded.sub;
        console.log('ID de usuario (sub):', userId);

        const clientRoles = decoded.resource_access?.['fastapi-client']?.roles || [];
        console.log('Roles del cliente (fastapi-client):', clientRoles);

        localStorage.setItem('userId', userId || '');
        localStorage.setItem('userRoles', JSON.stringify(clientRoles));

        if (clientRoles.includes('admin_client')) {
          this.router.navigate(['/dashboard']);
        } else if (clientRoles.includes('publicist_client')) {
          this.router.navigate(['/campaign-search']);
        } else if (clientRoles.includes('moderator_client')) {
          this.router.navigate(['/total-reports']);
        } else if (clientRoles.includes('strategist_client')) {
          this.router.navigate(['/trend-analysis']);
        } else {
          alert('Rol no autorizado');
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
        alert('Error al intentar iniciar sesión');
      },
    });
  }
}
