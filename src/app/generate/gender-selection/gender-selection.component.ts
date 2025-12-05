import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PromptService } from 'src/app/generate/services/prompt.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  standalone: true,
  selector: 'app-gender-selection',
  templateUrl: './gender-selection.component.html',
  styleUrls: ['./gender-selection.component.css'],
})
export class GenderSelectionComponent {
  title = 'Depano AI';

  constructor(
    private router: Router,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService
  ) {}

  /**
   * Opens a specific category, adds it to the breadcrumb list, sets the gender prompt,
   * and navigates to the category's generation page.
   * @param {string} category - The category to open.
   */
  openCategory(category: string) {
    this.breadcrumbService.addBreadcrumb(category.toLowerCase(), category);
    this.promptService.setGender(category.toLowerCase());
    this.promptService.addToPrompt('gender', category.toLowerCase());
    this.router.navigate(['generate', category.toLowerCase()]);
  }

  disableBackButton() {
    // Add an initial dummy state
    history.pushState(null, '', window.location.href);

    // Listen for back and forward buttons (popstate event)
    window.addEventListener('popstate', (event) => {
      // Replace the state to prevent the back button from navigating
      history.pushState(null, '', window.location.href);
    });
  }
}
