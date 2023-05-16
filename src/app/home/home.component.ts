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

  openCategory(category: string) {
    this.breadcrumbService.addBreadcrumb(category, category);
    if (category === 'Men') {
      this.prompt.addToPrompt('gender', 'Male');
    } else if (category === 'Women') {
      this.prompt.addToPrompt('gender', 'Female');
    }
    this.router.navigate(['generate', category]);
  }
}
