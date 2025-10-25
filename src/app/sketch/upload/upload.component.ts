import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PreviewComponent } from '../preview/preview.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, PreviewComponent, LucideAngularModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  step: 'upload' | 'design-preview' = 'upload';
  uploadedFile: File | null = null;
  dragActive = false;
  generatedImageUrl: string | null = null;
  errorMessage: string | null = null;

  constructor(private ngxService: NgxUiLoaderService) {}

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
    this.errorMessage = null;

    if (!this.allowedTypes.includes(file.type)) {
      this.errorMessage = 'Only JPG, JPEG, or PNG files are allowed.';
      this.uploadedFile = null;
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > this.maxFileSizeMB) {
      this.errorMessage = `File size exceeds ${this.maxFileSizeMB}MB limit.`;
      this.uploadedFile = null;
      return;
    }

    this.uploadedFile = file;
  }

  handleGenerateImage(): void {
    if (!this.uploadedFile) {
      alert('Please upload a sketch first');
      return;
    }

    this.ngxService.start();
    const formData = new FormData();
    formData.append('sketch', this.uploadedFile);
    setTimeout(() => {
      this.step = 'design-preview';
      this.ngxService.stop();
    }, 2000);
  }

  handleStartOver(): void {
    this.step = 'upload';
    this.uploadedFile = null;
    this.generatedImageUrl = null;
    this.errorMessage = null;
  }

  handleDownload(): void {
    alert('Download started! Your high-resolution design is being downloaded');
  }

  handleShare(): void {
    alert('Share link copied! Share your creation with others');
  }
}
