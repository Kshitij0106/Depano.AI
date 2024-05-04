import { Component } from '@angular/core';
import { PromptService } from '../generate/services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';

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
    private checkAttributeService: CheckedAttributesService,
    private router: Router
  ) {
    this.sendRequest();
  }

  /**
   * Navigates to homepage.
   * Empties the breadcrumb list.
   */
  openHome() {
    this.router.navigate(['gender']);
    this.emptyData();
  }

  /**
   * Sends a request to the prompt service to retrieve images and updates the 'images' property accordingly.
   */
  sendRequest() {
    this.promptService.showPrompt();
    this.promptService.sendPrompt().subscribe((data) => {
      this.image = data.url;
    });
    this.emptyData();
  }

  emptyData() {
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }
}
