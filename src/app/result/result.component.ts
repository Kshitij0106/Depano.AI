import { Component, OnInit } from '@angular/core';
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
import { PromptService } from '../services/prompt.service';
import { CategoryService } from '../generate/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  imports: [HeaderComponent, CommonModule, LucideAngularModule],
})
export class ResultComponent implements OnInit {
  image!: string;

  private sub!: Subscription;

  constructor(
    private imageService: ImageService,
    private promptService: PromptService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private categoryService: CategoryService,
    private checkAttributeService: CheckedAttributesService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
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
    }
  }

  generateImage() {
    this.imageService.imageSubject.next(null);
    this.sub = this.imageService.imageSubject.subscribe((result) => {
      if (!result) return;
      if (result) {
        console.log(result);
        this.image = result.url;
        this.promptService.setPromptId(result.promptId);
        this.userService.updateUserDetails();
        this.toastr.success(result.message);
      } else {
        // this.errorService.errorSubject.next(err.error?.status);
        this.router.navigate(['error']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Sends a request to the generate image.
   */
  // generateImage() {
  //   this.imageService.generateImage().subscribe({
  //     next: (result) => {
  //       if (result.status === 'Success') {
  //         this.image = result.url;
  //         this.result = 'success';
  //         this.error = false;
  //         this.promptService.setPromptId(result.promptId);
  //         this.userService.updateUserDetails();
  //         this.toastr.success(result.message);
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       this.error = true;
  //       if (
  //         err.error?.status === 'SERVICE_UNAVAILABLE' ||
  //         err.error?.status === 'INTERNAL_SERVER_ERROR'
  //       ) {
  //         this.toastr.error('networkIssue');
  //         this.result = 'networkIssue';
  //       } else if (err.error?.status === 'PAYMENT_REQUIRED') {
  //         this.toastr.error('creditIssue');
  //         this.result = 'creditIssue';
  //       }
  //     },
  //   });
  // }

  /**
   * Sends a request again to the prompt service to retrieve image and updates the 'image' property accordingly.
   */
  regenerate() {
    const promptId = this.promptService.getPromptId();
    if (promptId) {
      this.imageService.regenerateImage(promptId).subscribe({
        next: (result) => {
          if (result.status === 'Success') {
            this.image = result.url;
            this.userService.updateUserDetails();
          }
        },
        error: (err: HttpErrorResponse) => {
          if (
            err.error?.status === 'SERVICE_UNAVAILABLE' ||
            err.error?.status === 'INTERNAL_SERVER_ERROR'
          ) {
          } else if (err.error?.status === 'PAYMENT_REQUIRED') {
          }
        },
      });
    }
  }

  editImage() {
    this.imageService.imageUrl.next(this.image);
    this.router.navigate(['edit']);
  }

  downloadImage() {
    if (!this.image) {
      this.toastr.error('No image available to download');
      return;
    }
    (async () => {
      try {
        const res = await fetch(this.image);
        if (!res.ok) throw new Error('Network response was not ok');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'depano-design.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        // revoke after a short delay to ensure download started
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (err) {
        this.toastr.error('Failed to download image');
      }
    })();
  }

  async shareImage() {
    if (!this.image) {
      this.toastr.error('No image available to share');
      return;
    }
    // Try Web Share API first
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({
          title: 'My AI Design',
          text: 'Check out this design generated by Depano AI',
          url: this.image,
        });
        return;
      }

      // Fallback: copy URL to clipboard
      if ((navigator as any).clipboard) {
        await (navigator as any).clipboard.writeText(this.image);
        this.toastr.success('Image link copied to clipboard');
        return;
      }

      this.toastr.info('Sharing not supported in this browser');
    } catch (err) {
      this.toastr.error('Failed to share image');
    }
  }

  /**
   * Empties the data.
   */
  emptyData() {
    this.promptService.clearPromptId();
    this.imageService.imageUrl.next('');
    this.categoryService.deleteCategories();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }
}
