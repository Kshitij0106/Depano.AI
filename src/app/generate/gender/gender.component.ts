import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { PromptService } from 'src/app/services/prompt.service';

@Component({
  standalone: true,
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
})
export class GenderComponent {
  title = 'Depano AI';

  constructor(
    private router: Router,
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService,
  ) {}

  /**
   * Opens a specific category, adds it to the breadcrumb list, sets the gender prompt,
   * and navigates to the category's generation page.
   * @param {string} category - The category to open.
   */
  openCategory(category: string) {
    this.breadcrumbService.addBreadcrumb(category.toLowerCase(), category);
    this.promptService.setGender(category.toLowerCase());
    this.router.navigate(['generate', category.toLowerCase()]);
  }
}
