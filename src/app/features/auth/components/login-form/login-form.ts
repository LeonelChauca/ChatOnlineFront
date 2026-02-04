import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { LoginInterface } from '../../../../core/models/auth/login.interface';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-login-form',
  imports: [FormField],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {
  private authService = inject(AuthService);

  public loading = this.authService.loading;

  loginModel = signal<LoginInterface>({
    email: '',
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
    } else {
      this.loginForm().markAsTouched();
    }
  }
}
