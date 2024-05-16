import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { PromptService } from '../generate/services/prompt.service';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'DEPANO AI';

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private promptService: PromptService,
    private checkAttributeService: CheckedAttributesService
  ) {}

  /**
   * Navigates to homepage.
   */
  openHome() {
    this.emptyData();
    this.router.navigate(['home']);
  }

  /**
   * Empties the data.
   */
  emptyData() {
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }
}
