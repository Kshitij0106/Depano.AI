import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from '../generate/service/prompt.service';
import { BreadcrumbService } from '../service/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  title = 'Depano.AI';

  constructor(
    private router: Router,
    private prompt: PromptService,
    private breadcrumbService: BreadcrumbService
  ) {}

  /**
   * Opens a specific category, adds it to the breadcrumb list, sets the gender prompt,
   * and navigates to the category's generation page.
   * @param {string} category - The category to open.
   */
  openCategory(category: string) {
    this.breadcrumbService.addBreadcrumb(category.toLowerCase(), category);
    this.prompt.addToPrompt('gender', category.toLowerCase());
    this.router.navigate(['generate', category.toLowerCase()]);
  }
}
