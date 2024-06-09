import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './generate/category/category.component';
import { CategoryListComponent } from './generate/category-list/category-list.component';
import { UserInputComponent } from './generate/user-input/user-input.component';
import { ResultComponent } from './result/result.component';
import { PromptService } from './generate/services/prompt.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { CategoryService } from './generate/services/data/category.service';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { GenderSelectionComponent } from './generate/gender-selection/gender-selection.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import { AuthService } from './auth/services/auth.service';
import { CheckedAttributesService } from './generate/services/checked-attributes.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CategoryComponent,
    CategoryListComponent,
    UserInputComponent,
    ResultComponent,
    GenderSelectionComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [
    CategoryService,
    PromptService,
    BreadcrumbService,
    UserService,
    AuthService,
    CheckedAttributesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
