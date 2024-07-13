import { Component } from '@angular/core';
import { PromptService } from '../generate/services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  image!: string;
  email!: string;

  constructor(
    private promptService: PromptService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private checkAttributeService: CheckedAttributesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getUserData();
    this.sendRequest();
  }

  /**
   * Navigates to homepage.
   */
  openHome() {
    this.emptyData();
    this.router.navigate(['gender']);
  }

  getUserData() {
    this.email = this.userService.getEmail() || '';
  }

  /**
   * Sends a request to the prompt service to retrieve images and updates the 'images' property accordingly.
   */
  sendRequest() {
    this.promptService.sendPrompt(this.email).subscribe((result) => {
      if (result.status === 'Success') {
        this.image = result.url;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  regenerate() {
    this.getUserData();
    this.promptService.regenerate(this.email).subscribe((result) => {
      if (result.status === 'Success') {
        this.image = result.url;
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  /**
   * Empties the data.
   */
  emptyData() {
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }
}
