import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './generate/category/category.component';
import { ResultComponent } from './result/result.component';
import { GenderSelectionComponent } from './generate/gender-selection/gender-selection.component';

const routes: Routes = [
  { path: '', redirectTo: '/gender', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'gender', component: GenderSelectionComponent },
  { path: 'generate/:category', component: CategoryComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
