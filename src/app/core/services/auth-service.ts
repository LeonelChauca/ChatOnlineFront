import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api-service';
import { LoginInterface } from '../models/auth/login.interface';
import { finalize, tap } from 'rxjs';
import { ResponseLogin } from '../models/auth/response-login';
import { ResponseInterface } from '../models/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = inject(ApiService);

  private _user = signal<any>(null);

  public readonly loading = signal<boolean>(false);

  user = this._user.asReadonly();

  login(credentials: LoginInterface) {
    this.loading.set(true);
    return this.api.post<ResponseInterface<ResponseLogin>>('auth/login', credentials).pipe(
      tap((response) => {
        const data = response.data;
        console.log('Login Response:', response);
        localStorage.setItem('accessToken', data?.accessToken!);
        this._user.set(response.data?.user);
      }),
      finalize(() => this.loading.set(false)),
    );
  }
}
