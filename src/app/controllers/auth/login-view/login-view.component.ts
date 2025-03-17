import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms'; // ✅ Importar FormsModule
import { CommonModule } from '@angular/common';
import { addAbortListener } from 'events';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginViewComponent {
  username = '';
  password = '';
  passwordFieldType = 'password';
  passwordIcon = '/assets/icons/invisible.svg'; // Ícono inicial (oculto)

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = '/assets/icons/visible.svg';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = '/assets/icons/invisible.svg';
    }
  }

  login() {
    console.log('Intentando iniciar sesión con:', this.username, this.password);
    if (this.authService.login(this.username, this.password)) {
      if (this.username === 'admin' && this.password === 'admin123') {
        this.router.navigate(['/dashboard']);
      } else if(this.username === 'publi' && this.password === 'publi123') {
        this.router.navigate(['/campaign-search']);
      } else if(this.username === 'mod'  && this.password === 'mod123') {
        this.router.navigate(['/total-reports']);
      } else if(this.username === 'strats' && this.password === 'strats123') {
        this.router.navigate(['/trend-analysis'])
      }
      else {
      alert('Credenciales incorrectas');
      }
    }
  }
}
