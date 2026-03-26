import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './app/auth/services/auth.interceptor';
import { provideAppIcons } from './app/shared/icons/icons.provider';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAppIcons(),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      NgxUiLoaderModule,
      ToastrModule.forRoot(),
      NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
});
