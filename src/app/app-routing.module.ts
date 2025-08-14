import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './homepage/home/home.component';
import { GenderSelectionComponent } from './generate/gender-selection/gender-selection.component';
import { CategoryComponent } from './generate/category/category.component';
import { ResultComponent } from './result/result.component';
import { EditComponent } from './edit/edit.component';
import { authGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
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
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [authGuard],
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
