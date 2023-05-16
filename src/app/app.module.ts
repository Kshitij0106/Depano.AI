import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './generate/category/category.component';
import { CategoryListComponent } from './generate/category-list/category-list.component';
import { UserInputComponent } from './generate/user-input/user-input.component';
import { OptionalTypesComponent } from './generate/optional-types/optional-types.component';
import { ResultComponent } from './result/result.component';
import { PromptService } from './generate/service/prompt.service';
import { SearchService } from './generate/service/search.service';
import { BreadcrumbService } from './service/breadcrumb.service';
import { MenCategoryService } from './generate/service/data/men-category.service';
import { WomenCategoryService } from './generate/service/data/women-category.service';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoryComponent,
    CategoryListComponent,
    UserInputComponent,
    OptionalTypesComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [
    MenCategoryService,
    WomenCategoryService,
    PromptService,
    BreadcrumbService,
    SearchService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
