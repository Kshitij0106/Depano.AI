import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './homepage/home/home.component';
import { AboutComponent } from './homepage/about/about.component';
import { OutputsComponent } from './homepage/outputs/outputs.component';
import { VisionComponent } from './homepage/vision/vision.component';
import { TestimonialsComponent } from './homepage/testimonials/testimonials.component';
import { GenderSelectionComponent } from './generate/gender-selection/gender-selection.component';
import { CategoryComponent } from './generate/category/category.component';
import { CategoryListComponent } from './generate/category-list/category-list.component';
import { UserInputComponent } from './generate/user-input/user-input.component';
import { ResultComponent } from './result/result.component';
import { EditComponent } from './edit/edit.component';
import { AuthService } from './auth/services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './generate/services/data/category.service';
import { PromptService } from './generate/services/prompt.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { CheckedAttributesService } from './generate/services/checked-attributes.service';
import { EditService } from './services/edit.service';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    OutputsComponent,
    VisionComponent,
    TestimonialsComponent,
    GenderSelectionComponent,
    CategoryComponent,
    CategoryListComponent,
    UserInputComponent,
    ResultComponent,
    EditComponent,
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
    AuthService,
    UserService,
    CategoryService,
    PromptService,
    BreadcrumbService,
    CheckedAttributesService,
    EditService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
