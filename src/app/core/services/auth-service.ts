import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api-service';
import { LoginInterface } from '../models/auth/login.interface';
import { tap } from 'rxjs';
import { ResponseLogin } from '../models/auth/response-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);

  private _user = signal<any>(null);

  user = this._user.asReadonly();

  login(credentials: LoginInterface) {
    return this.api.post<ResponseLogin>('auth/login', credentials).pipe(
      tap((response) => {
        console.log('Login Response:', response);
        localStorage.setItem('accessToken', response.accessToken);
        this._user.set(response.user);
      }),
    );
  }
}
