import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../service/breadcrumb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnChanges {
  title = 'Depano.ai';
  breadcrumbs!: Map<string, string>;
  list: string[] = [];

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}
  ngOnChanges() {}

  openHome() {
    this.breadcrumbService.emptyBreadcrumbList();
    this.router.navigate(['home']);
  }

  get breadcrumbsList() {
    return this.breadcrumbService.getBreadcrumbs();
  }

  goToBreadcrumb(code: string) {
    this.breadcrumbService.createNewList(code);
  }
}
