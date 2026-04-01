import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserInputComponent } from '../generate/user-input/user-input.component';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';
import { ErrorType } from '../error/error.type';

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

  selectedCategoryName: string = '';
  hideUserPrompt: boolean = false;

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getImage();
  }

  private getImage() {
    this.imageService.imageUrl.subscribe((image) => {
      this.image = image;
    });
  }

  inputSelected(input: string) {
    this.userPrompt = input;
    this.editImage();
  }

  async editImage() {
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
            this.userService.updateUserDetails();
            this.toastr.success(result.message);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorService.errorSubject.next(err.error?.status);
          this.router.navigate(['error']);
        },
      });
    } catch (err) {
      this.errorService.errorSubject.next(ErrorType.INTERNAL_SERVER_ERROR);
      this.router.navigate(['error']);
    }
  }
}
