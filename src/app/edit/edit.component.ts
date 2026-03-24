import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserInputComponent } from '../generate/user-input/user-input.component';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [HeaderComponent, FormsModule, CommonModule, UserInputComponent],
})
export class EditComponent implements OnInit {
  image: string = '';
  userPrompt: string = '';

  result: string = '';
  error: boolean = false;

  selectedCategoryName: string = '';
  hideUserPrompt: boolean = false;

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  private getImage() {
    this.imageService.imageUrl.subscribe((image) => {
      this.image = image;
    });
    this.result = 'success';
  }

  inputSelected(input: string) {
    this.userPrompt = input;
    this.sendToServer();
  }

  /** Send original image URL, mask blob, and prompt to server */
  async sendToServer(): Promise<void> {
    try {
      const imageFile = await this.imageService.fetchImageFromUrl(this.image);

      const formData = await this.imageService.prepareFormData(
        'image',
        imageFile,
        this.userPrompt,
      );
      this.imageService.editImage(formData).subscribe({
        next: (result) => {
          if (result.status === 'Success') {
            this.image = result.url;
            this.result = 'success';
            this.error = false;
            const base64 = result.url;
            const editedImageUrl = `data:image/png;base64,${base64}`;
            this.image = editedImageUrl;
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
    } catch (err) {
      console.error('Error preparing data:', err);
    }
  }
}
