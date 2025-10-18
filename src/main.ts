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
import {
  ArrowRight,
  BadgeQuestionMark,
  BookOpen,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  FileText,
  Globe,
  Heart,
  HelpCircle,
  Instagram,
  Linkedin,
  LogIn,
  LucideAngularModule,
  Mail,
  MapPin,
  Palette,
  Phone,
  Scissors,
  Shield,
  Shirt,
  Smartphone,
  Sparkles,
  Twitter,
  User,
  UserPlus,
  Users,
  Wand2,
  WandSparkles,
  Youtube,
} from 'lucide-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      NgxUiLoaderModule,
      ToastrModule.forRoot(),
      NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
      LucideAngularModule.pick({
        Sparkles,
        Phone,
        MapPin,
        Heart,
        Instagram,
        Twitter,
        Facebook,
        Linkedin,
        Youtube,
        Users,
        Palette,
        Wand2,
        Camera,
        User,
        Shield,
        FileText,
        HelpCircle,
        Globe,
        Clock,
        LogIn,
        UserPlus,
        BookOpen,
        Scissors,
        Shirt,
        ChevronLeft,
        ChevronRight,
        WandSparkles,
        BadgeQuestionMark,
        Mail,
        Smartphone,
        ArrowRight,
      })
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
});
