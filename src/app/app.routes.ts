import { Routes } from '@angular/router';
import { AuthLayout } from './features/auth/Layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.auth_routes),
  }

];
