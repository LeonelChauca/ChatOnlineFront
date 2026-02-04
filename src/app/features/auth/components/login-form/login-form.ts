import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { LoginInterface } from '../../../../core/models/auth/login.interface';
import { AuthService } from '../../../../core/services/auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormField, FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  private authService = inject(AuthService);
  private emailFromStorage = localStorage.getItem('email') || '';
  public loading = this.authService.loading;

  public rememberMe = signal<boolean>(false);

  loginModel = signal<LoginInterface>({
    email: this.emailFromStorage,
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El correo es obligatorio.' });
    email(schemaPath.email, { message: 'El formato no es válido.' });
    required(schemaPath.password, { message: 'La contraseña es obligatoria.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().valid()) {
      console.log('Login Data:', this.loginForm().value());
      this.authService.login(this.loginForm().value()).subscribe();
      console.log('Remember Me:', this.rememberMe());
      if (!this.rememberMe()) {
        localStorage.removeItem('email');
        return;
      }
      localStorage.setItem('email', this.loginForm().value().email);
    } else {
      this.loginForm().markAsTouched();
    }
  }
}
