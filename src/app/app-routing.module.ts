import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './generate/category/category.component';
import { ResultComponent } from './result/result.component';
import { GenderSelectionComponent } from './generate/gender-selection/gender-selection.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/guard/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'gender',
    component: GenderSelectionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'generate/:category',
    component: CategoryComponent,
    canActivate: [authGuard],
  },
  { path: 'result', component: ResultComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
