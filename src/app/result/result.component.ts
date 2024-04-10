import { Component } from '@angular/core';
import { PromptService } from '../generate/services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  image!: string;

  constructor(
    private promptService: PromptService,
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) {
    this.sendRequest();
  }

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
   * Sends a request to the prompt service to retrieve images and updates the 'images' property accordingly.
   */
  sendRequest() {
    this.promptService.sendPrompt().subscribe((data) => {
      this.image = data.url;
    });
  }
}
