import { Component } from '@angular/core';
import { ImageService } from '../services/image.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { UserService } from '../services/user.service';
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
  error: boolean = false;

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private checkAttributeService: CheckedAttributesService,
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
    if (this.imageService.imageUrl.value === '') {
      this.generateImage();
    } else {
      this.image = this.imageService.imageUrl.value;
      this.result = 'success';
      this.error = false;
    }
  }

  /**
   * Sends a request to the generate image.
   */
  generateImage() {
    this.imageService.generateImage().subscribe({
      next: (result) => {
        if (result.status === 'Success') {
          this.image = result.url;
          this.result = 'success';
          this.error = false;
          this.imageService.setPromptId(result.promptId);
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
    const promptId = this.getPromptId();
    this.imageService.regenerateImage(promptId).subscribe({
      next: (result) => {
        if (result.status === 'Success') {
          this.image = result.url;
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
    this.imageService.imageUrl.next(this.image);
    this.router.navigate(['edit']);
  }

  getPromptId(): string {
    const promptId = localStorage.getItem('promptId');
    if (!promptId || promptId.trim().length === 0) {
      this.result = 'networkIssue';
      throw new Error('PromptId missing or invalid');
    }
    return promptId;
  }

  /**
   * Empties the data.
   */
  emptyData() {
    this.imageService.clearPromptId();
    this.imageService.imageUrl.next('');
    this.imageService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }
}
