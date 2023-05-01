import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbModule } from 'angular-crumbs';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './generate/category/category.component';
import { CategoryListComponent } from './generate/category-list/category-list.component';
import { UserInputComponent } from './generate/user-input/user-input.component';
import { ResultComponent } from './result/result.component';
import { MenCategoryService } from './generate/service/data/men-category.service';
import { WomenCategoryService } from './generate/service/data/women-category.service';
import { PromptService } from './generate/service/prompt.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoryComponent,
    CategoryListComponent,
    UserInputComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreadcrumbModule,
    HttpClientModule,
  ],
  providers: [MenCategoryService, WomenCategoryService, PromptService],
  bootstrap: [AppComponent],
})
export class AppModule {}
