import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService, breadcrumb } from '../services/breadcrumb.service';
import { PromptService } from '../generate/services/prompt.service';
import { SearchService } from '../generate/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Depano.ai';
  @Input() showProfile: boolean = true;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private promptService: PromptService,
    private searchService: SearchService
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

  /**
   * Retrieves the text from the user.
   * @emits {string} searchText - Emits an event to search the category.
   * @param {string} searchText - The input entered by the user.
   */
  searchCategory(searchText: string) {
    this.searchService.searchText.next(searchText);
  }
}
