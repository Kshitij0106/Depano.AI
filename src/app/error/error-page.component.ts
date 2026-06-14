import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../services/error.service';
import { ErrorType, ErrorConfig } from './error.type';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { CategoryService } from '../generate/services/category.service';
import { ImageService } from '../services/image.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
})
export class ErrorPageComponent implements OnInit {
  type: ErrorType = ErrorType.INTERNAL_SERVER_ERROR;
  config!: ErrorConfig;

  private navigationSubscription!: Subscription;

  constructor(
    private router: Router,
    private errorService: ErrorService,
    private breadcrumbService: BreadcrumbService,
    private imageService: ImageService,
    private categroryService: CategoryService,
    private checkAttributeService: CheckedAttributesService,
  ) {}

  ngOnInit(): void {
    this.errorService.errorSubject.subscribe({
      next: (error) => {
        if (error) {
          this.config = this.errorService.getError(error);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.config = this.errorService.getError(this.type);
      },
    });
    this.onBackButton();
  }

  get primaryActions() {
    return this.config.actions.filter((a) => a.position === 'primaryRow');
  }

  get secondaryActions() {
    return this.config.actions.filter((a) => a.position === 'secondaryRow');
  }

  handleAction(action: string): void {
    switch (action) {
      case 'retry':
        this.emptyData();
        this.router.navigate(['/mode-select']);
        break;
      case 'topup':
        this.router.navigate(['/top-up']);
        break;
      case 'home':
        this.emptyData();
        this.router.navigate(['/home']);
        break;
      case 'plans':
        this.router.navigate(['/pricing']);
        break;
    }
  }

  onBackButton() {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.router.navigate(['/mode-select']);
        }
      }
    });
  }

  emptyData() {
    this.categroryService.deleteCategories();
    this.imageService.clearImageData();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
