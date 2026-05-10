import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ImageService } from 'src/app/services/image.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { UserInputComponent } from 'src/app/generate/user-input/user-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageValidationService } from '../services/image-validation.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    LucideAngularModule,
    UserInputComponent,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  uploadedFile: File | null = null;
  dragActive = false;
  generatedImageUrl: string | null = null;
  userPrompt: string = '';

  public label: string = 'Describe your sketch';
  public hideUserPrompt: boolean = false;

  constructor(
    private imageService: ImageService,
    private imageValidationService: ImageValidationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  inputSelected(input: string) {
    if (!input.trim() && !this.uploadedFile) {
      this.toastr.error('Please upload a sketch first');
      return;
    }
    this.userPrompt = input;
    this.handleGenerateImage();
  }

  async handleGenerateImage(): Promise<void> {
    if (!this.uploadedFile) {
      this.toastr.error('Please upload a sketch first');
      return;
    }

    const formData = await this.imageService.prepareFormData(
      'sketch',
      this.uploadedFile,
      this.userPrompt,
    );

    this.router.navigate(['../', 'result'], {
      relativeTo: this.route,
    });
    this.imageService.sketchToImage(formData);
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
