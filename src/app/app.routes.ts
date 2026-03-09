import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
      },
      {
        path: 'landing',
        loadComponent: () =>
          import('./pages/landing/landing').then(m => m.Landing)
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login').then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register').then(m => m.Register)
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home/home').then(m => m.Home)
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('./pages/groups/groups').then(m => m.Groups)
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./pages/user/user').then(m => m.UserComponent)
      }
    ]
  }
];