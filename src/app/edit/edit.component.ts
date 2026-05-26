import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserInputComponent } from '../generate/user-input/user-input.component';
import { ErrorService } from '../services/error.service';
import { NavigationStart, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { CategoryService } from '../generate/services/category.service';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
  standalone: true,
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  imports: [
    HeaderComponent,
    FormsModule,
    CommonModule,
    UserInputComponent,
    LucideAngularModule,
  ],
})
export class EditComponent implements OnInit {
  image: string = '';
  userPrompt: string = '';

  label: string = 'Describe your changes';
  hideUserPrompt: boolean = false;

  private navigationSubscription!: Subscription;

  constructor(
    private imageService: ImageService,
    private userService: UserService,
    private errorService: ErrorService,
    private breadcrumbService: BreadcrumbService,
    private categoryService: CategoryService,
    private checkAttributeService: CheckedAttributesService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getImage();
    this.onBackButton();
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
            this.image = `data:image/png;base64,${result.url}`;
            this.userService.updateUserDetails();
            this.toastr.success(result.message);
          }
        },
      });
    } catch (err: any) {
      if (err.error?.status === 'BAD_REQUEST') {
        this.toastr.error(err.error?.message);
      } else {
        this.errorService.errorSubject.next(err.error?.status);
        this.router.navigate(['error']);
      }
    }
  }

  openModeSelect() {
    this.emptyData();
    this.router.navigate(['mode-select']);
  }

  downloadImage() {
    if (!this.image) {
      this.toastr.error('No image available to download');
      return;
    }
    (async () => {
      try {
        const res = await fetch(this.image);
        if (!res.ok) throw new Error('Network response was not ok');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'depano-design.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        // revoke after a short delay to ensure download started
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (err) {
        this.toastr.error('Failed to download image');
      }
    })();
  }

  emptyData() {
    this.imageService.clearImageData();
    this.categoryService.deleteCategories();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }

  onBackButton() {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
