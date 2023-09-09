import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService, breadcrumb } from '../service/breadcrumb.service';
import { PromptService } from '../generate/service/prompt.service';
import { SearchService } from '../generate/service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  title = 'Depano.ai';
  @Input() skip!: boolean;
  @Output() skipEvent = new EventEmitter<boolean>();
  @Output() goToBreadcrumbEvent = new EventEmitter<string>();
  breadcrumbs!: Map<string, string>;
  list: string[] = [];

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
   * A getter that retrieves the breadcrumb list from the breadcrumb service.
   * @returns {breadcrumb[]} - An array of breadcrumb items representing the current navigation path.
   */
  get breadcrumbsList(): breadcrumb[] {
    return this.breadcrumbService.getBreadcrumbs();
  }

  /**
   * Navigates to a specific breadcrumb by its code.
   * @emits {string} code - Emits an event to signal the navigation to the specified breadcrumb.
   * @param {string} code - The code of the breadcrumb to navigate to.
   */
  goToBreadcrumb(code: string) {
    // Creating a new breadcrumb list till that selected code
    this.breadcrumbService.createNewList(code);
    this.goToBreadcrumbEvent.emit(code);
  }

  /**
   * Retrieves the text from the user.
   * @emits {string} searchText - Emits an event to search the category.
   * @param {string} searchText - The input entered by the user.
   */
  searchCategory(searchText: string) {
    this.searchService.searchText.next(searchText);
  }

  onSkip() {
    this.skipEvent.emit(true);
  }
}
