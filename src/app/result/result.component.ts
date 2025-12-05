import { Component } from '@angular/core';
import { PromptService } from '../generate/services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { UserService } from '../services/user.service';
import { EditService } from '../services/edit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
})
export class ResultComponent {
  image!: string;
  result: string = '';
  promptId: string = '';
  error: boolean = false;

  constructor(
    private promptService: PromptService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private checkAttributeService: CheckedAttributesService,
    private editService: EditService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.getImage();
  }

  /**
   * Navigates to homepage.
   */
  openHome() {
    this.emptyData();
    this.router.navigate(['gender']);
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
    this.promptService.sendPrompt().subscribe({
      next: (result) => {
        if (result.status === 'Success') {
          this.image = result.url;
          this.promptId = result.promptId;
          this.result = 'success';
          this.error = false;
          this.userService.updateUserDetails();
          this.toastr.success(result.message);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.error = true;
        if (
          err.error?.status === 'SERVICE_UNAVAILABLE' ||
          err.error?.status === 'INTERNAL_SERVER_ERROR'
        ) {
          this.toastr.error('networkIssue');
          this.result = 'networkIssue';
        } else if (err.error?.status === 'PAYMENT_REQUIRED') {
          this.toastr.error('creditIssue');
          this.result = 'creditIssue';
        }
      },
    });
  }

  /**
   * Sends a request again to the prompt service to retrieve image and updates the 'image' property accordingly.
   */
  regenerate() {
    this.promptService.regenerate(this.promptId).subscribe({
      next: (result) => {
        if (result.status === 'Success') {
          this.image = result.url;
          this.promptId = result.promptId;
          this.result = 'success';
          this.error = false;
          this.userService.updateUserDetails();
        }
      },
      error: (err: HttpErrorResponse) => {
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
    this.promptId = '';
    this.editService.imageUrl.next('');
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }
}
