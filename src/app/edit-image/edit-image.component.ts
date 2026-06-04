import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ImageService } from '../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { UserInputComponent } from '../generate/user-input/user-input.component';
import { Router } from '@angular/router';
import { ImageValidationService } from '../services/image-validation.service';

@Component({
  selector: 'app-edit-image',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    LucideAngularModule,
    UserInputComponent,
  ],
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css'],
})
export class EditImageComponent {
  uploadedFile: File | null = null;
  dragActive = false;
  userPrompt: string = '';

  public label: string = 'Describe the changes you want';
  public hideUserPrompt: boolean = false;

  constructor(
    private imageService: ImageService,
    private imageValidationService: ImageValidationService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  inputSelected(input: string) {
    if (!input.trim() && !this.uploadedFile) {
      this.toastr.error('Please upload an image first');
      return;
    }
    this.userPrompt = input;
    this.handleEditImage();
  }

  async handleEditImage(): Promise<void> {
    if (!this.uploadedFile) {
      this.toastr.error('Please upload an image first');
      return;
    }

    const formData = await this.imageService.prepareFormData(
      'image',
      this.uploadedFile,
      this.userPrompt,
    );

    this.imageService.editImage(formData).subscribe({
      next: (result) => {
        this.imageService.imageSubject.next(result);
        this.router.navigate(['result']);
      },
      error: (error) => {
        this.toastr.error(
          error.error?.message || 'Unable to edit the image. Please try again.',
        );
      },
    });
  }

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
      this.validateAndSetFile(file);
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

  private async validateAndSetFile(file: File): Promise<void> {
    try {
      this.imageValidationService.preValidateImage(file);
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        file = await this.imageValidationService.convertHeicToJpeg(file);
      }
      await this.imageValidationService.postValidateFile(file);
      this.uploadedFile = file;
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
}
