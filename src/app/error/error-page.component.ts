import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../services/error.service';
import { ErrorType, ErrorConfig } from './error.type';

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

  constructor(
    private router: Router,
    private errorService: ErrorService,
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
        window.location.reload();
        break;
      case 'topup':
        this.router.navigate(['/top-up']);
        break;
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'plans':
        this.router.navigate(['/pricing']);
        break;
    }
  }
}
