import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth.guard';
import { HomeComponent } from './homepage/home/home.component';

const routes: Routes = [
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
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
