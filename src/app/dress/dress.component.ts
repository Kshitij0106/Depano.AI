import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { UserInputComponent } from '../generate/user-input/user-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageValidationService } from '../services/image-validation.service';
import { DesignService } from '../services/design.service';

@Component({
  selector: 'app-dress',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    LucideAngularModule,
    UserInputComponent,
  ],
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.css'],
})
export class DressComponent {
  uploadedFile: File | null = null;
  dragActive = false;
  userPrompt: string = '';

  public label: string = 'Describe the changes you want';
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
      this.toastr.error('Please upload an image first');
      return;
    }
    this.userPrompt = input;
    this.handleDressToDesign();
  }

  async handleDressToDesign(): Promise<void> {
    if (!this.uploadedFile) {
      this.toastr.error('Please upload a dress first');
      return;
    }
    const formData = await this.designService.prepareFormData(
      'dress',
      this.uploadedFile,
      this.userPrompt,
    );

    this.router.navigate(['../', 'design'], {
      relativeTo: this.route,
    });
    this.designService.dressToDesign(formData);
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
