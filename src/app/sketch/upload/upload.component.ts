import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from '../preview/preview.component';
import { LucideAngularModule } from 'lucide-angular';
import { SketchService } from 'src/app/services/sketch.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    PreviewComponent,
    LucideAngularModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  step: 'upload' | 'design-preview' = 'upload';
  uploadedFile: File | null = null;
  dragActive = false;
  generatedImageUrl: string | null = null;
  userPrompt: string =
    'Full length realistic image standing in a fashion photoshoot, studio lighting, high resolution, looking at the camera, crystal clear, 8K UHD, highly detailed glossy eyes, legal. Make sure the footwear is visible.';

  constructor(
    private sketchService: SketchService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  private readonly allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  private readonly maxFileSizeMB = 10;

  handleDrag(event: DragEvent, type: string): void {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'enter' || type === 'over') {
      this.dragActive = true;
    } else if (type === 'leave') {
      this.dragActive = false;
    }
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragActive = false;

    if (event.dataTransfer?.files?.length) {
      const file = event.dataTransfer.files[0];

      if (event.dataTransfer?.files?.length) {
        const file = event.dataTransfer.files[0];
        this.validateAndSetFile(file);
      }
    }
  }

  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.validateAndSetFile(file);
      input.value = '';
    }
  }

  /**
   *  Validate file type and size
   */
  private validateAndSetFile(file: File): void {
    if (!this.allowedTypes.includes(file.type)) {
      this.toastr.error('Only JPG, JPEG, or PNG files are allowed.');
      this.uploadedFile = null;
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > this.maxFileSizeMB) {
      this.toastr.error(`File size exceeds ${this.maxFileSizeMB}MB limit.`);
      this.uploadedFile = null;
      return;
    }

    this.uploadedFile = file;
  }

  resizeImageToStabilityLimit(file: File): Promise<Blob> {
    const MAX_PIXELS = 9_437_184; // 3072 x 3072

    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const currentPixels = width * height;

        // If already within limit, return original
        if (currentPixels <= MAX_PIXELS) {
          return resolve(file);
        }

        // Scale factor
        const scale = Math.sqrt(MAX_PIXELS / currentPixels);

        const newWidth = Math.floor(width * scale);
        const newHeight = Math.floor(height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject('Canvas Blob conversion failed');
          },
          file.type,
          0.92 // compression quality
        );
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async handleGenerateImage(): Promise<void> {
    if (!this.uploadedFile) {
      this.toastr.error('Please upload a sketch first');
      return;
    }

    try {
      const resizedBlob = await this.resizeImageToStabilityLimit(
        this.uploadedFile
      );

      const resizedImage = new File([resizedBlob], this.uploadedFile.name, {
        type: this.uploadedFile.type,
      });

      const formData = await this.sketchService.prepareSketchFormData(
        resizedImage,
        this.userPrompt
      );

      this.sketchService.sketchToImage(formData).subscribe({
        next: (result) => {
          if (result.status === 'Success') {
            const base64 = result.url;
            this.generatedImageUrl = `data:image/png;base64,${base64}`;
            // this.result = 'success';
            this.userService.updateUserDetails();
            this.step = 'design-preview';
            this.toastr.success(result.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          // this.error = true;
          // if (
          //   err.error?.status === 'SERVICE_UNAVAILABLE' ||
          //   err.error?.status === 'INTERNAL_SERVER_ERROR'
          // ) {
          // this.toastr.success('networkIssue');
          //   this.result = 'networkIssue';
          // } else if (err.error?.status === 'PAYMENT_REQUIRED') {
          //   this.result = 'creditIssue';
          // }
        },
      });
    } catch (error) {
      this.toastr.error('An error occurred while processing the image.');
    }
  }

  handleStartOver(): void {
    this.step = 'upload';
    this.uploadedFile = null;
    this.generatedImageUrl = null;
  }

  handleDownload(): void {
    alert('Download started! Your high-resolution design is being downloaded');
  }

  handleShare(): void {
    alert('Share link copied! Share your creation with others');
  }
}
