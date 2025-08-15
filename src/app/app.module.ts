import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
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
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
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
