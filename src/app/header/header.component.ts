import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../service/breadcrumb.service';
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
  breadcrumbs!: Map<string, string>;
  list: string[] = [];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private promptService: PromptService,
    private searchService: SearchService
  ) {}

  openHome() {
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.router.navigate(['home']);
  }

  get breadcrumbsList() {
    return this.breadcrumbService.getBreadcrumbs();
  }

  goToBreadcrumb(code: string) {
    this.breadcrumbService.createNewList(code);
  }

  searchCategory(searchText: string) {
    this.searchService.searchText.next(searchText);
  }

  onSkip() {
    this.skipEvent.emit(true);
  }
}
