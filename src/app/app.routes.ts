import { ApplicationConfig } from '@angular/core';
import { authGuard } from './auth/guard/auth.guard';
import { authRedirectGuard } from './auth/guard/auth-redirect.guard';
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
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import('./auth/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'pricing',
    loadComponent: () =>
      import('./pricing/pricing.component').then((m) => m.PricingComponent),
  },
  {
    path: 'mode',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./mode/mode.component').then((m) => m.ModeComponent),
  },
  {
    path: 'gender',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./generate/gender/gender.component').then(
        (m) => m.GenderComponent,
      ),
  },
  {
    path: 'generate/:category',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./generate/category/category.component').then(
        (m) => m.CategoryComponent,
      ),
  },
  {
    path: 'design',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./design/design.component').then((m) => m.DesignComponent),
  },
  {
    path: 'sketch',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./sketch/sketch.component').then((m) => m.SketchComponent),
  },
  {
    path: 'edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./edit/edit.component').then((m) => m.EditComponent),
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./error/error-page.component').then((m) => m.ErrorPageComponent),
  },
  { path: '**', redirectTo: '/home' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
