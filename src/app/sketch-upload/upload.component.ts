import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ImageService } from 'src/app/services/image.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { UserInputComponent } from 'src/app/generate/user-input/user-input.component';
import { ActivatedRoute, Router } from '@angular/router';

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

  private readonly allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  private readonly maxFileSizeMB = 4;

  constructor(
    private imageService: ImageService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  inputSelected(input: string) {
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

  private validateAndSetFile(file: File): void {
    const fileName = file.name.toLowerCase();

    const isValidType = this.allowedTypes.includes(file.type);

    const isValidExtension =
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.png');

    if (!isValidType || !isValidExtension) {
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
}
