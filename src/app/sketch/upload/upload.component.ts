import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PreviewComponent } from '../preview/preview.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, PreviewComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  @Input() onBack?: () => void;

  step: 'upload' | 'design-preview' = 'upload';
  uploadedFile: File | null = null;
  dragActive = false;
  generatedImageUrl: string | null = null;

  constructor(private ngxService: NgxUiLoaderService) {}

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
      if (file.type.startsWith('image/')) {
        this.uploadedFile = file;
      } else {
        alert('Please upload an image file');
      }
    }
  }

  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.uploadedFile = file;
    }
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
  }

  handleDownload(): void {
    alert('Download started! Your high-resolution design is being downloaded');
  }

  handleShare(): void {
    alert('Share link copied! Share your creation with others');
  }
}
