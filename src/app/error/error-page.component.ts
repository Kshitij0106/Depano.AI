import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR_CONFIG_MAP } from './error.config';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ErrorType, ErrorConfig } from './error.type';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
})
export class ErrorPageComponent implements OnInit {
  @Input() type: ErrorType = ErrorType.SERVER_ERROR;

  config!: ErrorConfig;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.config = ERROR_CONFIG_MAP[this.type];
  }

  handlePrimaryAction(): void {
    switch (this.config.primaryAction.action) {
      case 'retry':
        window.location.reload();
        break;
      case 'topup':
        this.router.navigate(['/top-up']);
        break;
    }
  }

  handleSecondaryAction(): void {
    switch (this.config.secondaryAction?.action) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'plans':
        this.router.navigate(['/plans']);
        break;
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
