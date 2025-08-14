import { Component, OnInit } from '@angular/core';
import { PromptService } from '../generate/services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { UserService } from '../services/user.service';
import { EditService } from '../services/edit.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  image!: string;
  email!: string;
  result: string = '';
  error: boolean = false;

  constructor(
    private promptService: PromptService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private checkAttributeService: CheckedAttributesService,
    private editService: EditService,
    private router: Router
  ) {
    this.getUserData();
    this.getImage();
  }

  /**
   * Navigates to homepage.
   */
  openHome() {
    this.emptyData();
    this.router.navigate(['gender']);
  }

  /**
   * Get user data from details stored in session storage.
   */
  getUserData() {
    this.email = this.userService.getEmail() || '';
  }

  getImage() {
    if (this.editService.imageUrl.value === '') {
      this.sendRequest();
    } else {
      this.image = this.editService.imageUrl.value;
      this.result = 'success';
      this.error = false;
    }
  }

  /**
   * Sends a request to the prompt service to retrieve image and updates the 'image' property accordingly.
   */
  sendRequest() {
    this.promptService.sendPrompt(this.email).subscribe({
      next: (result) => {
        this.image = result.url;
        if (result.status === 'Success') {
          this.result = 'success';
          this.error = false;
          this.userService.updateCredits();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.image = err.error.url;
        this.error = true;
        if (
          err.error?.status === 'SERVICE_UNAVAILABLE' ||
          err.error?.status === 'INTERNAL_SERVER_ERROR'
        ) {
          this.result = 'networkIssue';
        } else if (err.error?.status === 'PAYMENT_REQUIRED') {
          this.result = 'creditIssue';
        }
      },
    });
  }

  /**
   * Sends a request again to the prompt service to retrieve image and updates the 'image' property accordingly.
   */
  regenerate() {
    this.getUserData();
    this.promptService.sendPrompt(this.email).subscribe({
      next: (result) => {
        this.image = result.url;
        if (result.status === 'Success') {
          this.result = 'success';
          this.error = false;
          this.userService.updateCredits();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.image = err.error.url;
        this.error = true;
        if (
          err.error?.status === 'SERVICE_UNAVAILABLE' ||
          err.error?.status === 'INTERNAL_SERVER_ERROR'
        ) {
          this.result = 'networkIssue';
        } else if (err.error?.status === 'PAYMENT_REQUIRED') {
          this.result = 'creditIssue';
        }
      },
    });
  }

  editImage() {
    this.editService.imageUrl.next(this.image);
    this.router.navigate(['edit']);
  }

  /**
   * Empties the data.
   */
  emptyData() {
    this.editService.imageUrl.next('');
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }
}
