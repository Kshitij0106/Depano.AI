import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';
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
  step: 'upload' | 'design-preview' = 'upload';
  uploadedFile: File | null = null;
  dragActive = false;
  generatedImageUrl: string | null = null;
  userPrompt: string =
    'Full length realistic image standing in a fashion photoshoot, studio lighting, high resolution, looking at the camera, crystal clear, 8K UHD, highly detailed glossy eyes, legal. Make sure the footwear is visible.';

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public selectedCategoryName: string = 'Or describe something custom';
  public hideUserPrompt: boolean = false;

  inputSelected(input: string) {
    this.userPrompt = input;
    console.log(this.userPrompt);
  }

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

  async handleGenerateImage(): Promise<void> {
    if (!this.uploadedFile) {
      this.toastr.error('Please upload a sketch first');
      return;
    }

    const resizedImage = new File([this.uploadedFile], this.uploadedFile.name, {
      type: this.uploadedFile.type,
    });

    const formData = await this.imageService.prepareSketchFormData(
      resizedImage,
      this.userPrompt,
    );

    this.router.navigate(['../', 'result'], {
      relativeTo: this.route,
    });
    this.imageService.sketchToImage(formData);
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
