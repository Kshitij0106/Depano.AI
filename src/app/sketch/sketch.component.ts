import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { DesignService } from 'src/app/services/design.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from 'src/app/header/header.component';
import { UserInputComponent } from 'src/app/generate/user-input/user-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageValidationService } from '../services/image-validation.service';

@Component({
  selector: 'app-sketch',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    LucideAngularModule,
    UserInputComponent,
  ],
  templateUrl: './sketch.component.html',
  styleUrl: './sketch.component.css',
})
export class SketchComponent {
  uploadedFile: File | null = null;
  dragActive = false;
  userPrompt: string = '';

  public label: string = 'Describe your sketch';
  public hideUserPrompt: boolean = false;

  constructor(
    private designService: DesignService,
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
    this.handleGenerateDesign();
  }

  async handleGenerateDesign(): Promise<void> {
    if (!this.uploadedFile) {
      this.toastr.error('Please upload a sketch first');
      return;
    }

    const formData = await this.designService.prepareFormData(
      'sketch',
      this.uploadedFile,
      this.userPrompt,
    );

    this.router.navigate(['../', 'design'], {
      relativeTo: this.route,
    });
    this.designService.sketchToDesign(formData);
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
