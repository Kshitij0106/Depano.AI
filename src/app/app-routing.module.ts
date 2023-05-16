import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './generate/category/category.component';
import { ResultComponent } from './result/result.component';
import { OptionalTypesComponent } from './generate/optional-types/optional-types.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'generate/:category', component: CategoryComponent },
  { path: 'generate/optional/:type', component: OptionalTypesComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
