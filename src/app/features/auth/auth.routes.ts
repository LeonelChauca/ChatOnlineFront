import { Routes } from "@angular/router";

export const auth_routes:Routes=[
    {
        path:'login',
        loadComponent:()=>import('./pages/login-page/login-page').then(m=>m.LoginPage)
    }
]
