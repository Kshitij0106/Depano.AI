import { ApplicationConfig } from '@angular/core';
import { authGuard } from './auth/guard/auth.guard';
import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./homepage/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  // {
  //   path: 'signup',
  //   loadComponent: () =>
  //     import('./auth/signup/signup.component').then((m) => m.SignupComponent),
  // },
  // {
  //   path: 'category-selection',
  //   loadComponent: () =>
  //     import('./category-selection/category-selection.component').then(
  //       (m) => m.DashboardComponent
  //     ),
  // },
  {
    path: 'gender',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./generate/gender-selection/gender-selection.component').then(
        (m) => m.GenderSelectionComponent
      ),
  },
  {
    path: 'generate/:category',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./generate/category/category.component').then(
        (m) => m.CategoryComponent
      ),
  },
  {
    path: 'result',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./result/result.component').then((m) => m.ResultComponent),
  },
  {
    path: 'edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./edit/edit.component').then((m) => m.EditComponent),
  },
  {
    path: 'sketch-to-image',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./sketch/upload/upload.component').then((m) => m.UploadComponent),
  },
  { path: '**', redirectTo: '/home' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
