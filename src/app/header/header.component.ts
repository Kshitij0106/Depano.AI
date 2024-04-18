import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { PromptService } from '../generate/services/prompt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Depano.ai';

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private promptService: PromptService
  ) {}

  /**
   * Navigates to homepage.
   * Empties the breadcrumb list.
   */
  openHome() {
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.router.navigate(['home']);
  }
}
