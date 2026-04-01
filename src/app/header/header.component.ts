import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { ImageService } from '../services/image.service';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CategoryService } from '../generate/services/category.service';
import { PromptService } from '../services/prompt.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, LucideAngularModule],
})
export class HeaderComponent implements OnInit {
  title = 'DEPANO AI';
  @Input() source: string = '';
  showProfile: boolean = true;

  colorStart: string = '#444543';
  colorEnd: string = '#c1bebe';

  loggedInUser: User = {
    userName: '',
    credits: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private imageService: ImageService,
    private categroryService: CategoryService,
    private promptService: PromptService,
    private checkAttributeService: CheckedAttributesService,
  ) {}

  ngOnInit(): void {
    this.checkProfile();
    this.updateUserDetails();
  }

  /**
   * Show Profile dropdown on homepage only if logged in.
   */
  checkProfile() {
    if (
      (this.source === 'home' || this.source === 'pricing') &&
      !this.authService.isLoggedIn()
    ) {
      this.showProfile = false;
    } else {
      this.showProfile = true;
    }
  }

  /**
   * Update credits after successfull generation of image.
   */
  updateUserDetails() {
    if (this.authService.isLoggedIn()) {
      this.userService.userDetails.subscribe((user) => {
        this.loggedInUser.userName =
          user.userName || this.userService.getUserName();
        this.loggedInUser.credits = user.credits;
      });
    }
  }

  getUsername(name: string): string {
    if (!name) return '';

    const trimmed = name.trim();

    // If name contains a space, take only the first name
    if (trimmed.includes(' ')) {
      return trimmed.split(' ')[0].substring(0, 10);
    }

    // No space — truncate with ellipsis if too long
    return trimmed.length > 10 ? trimmed.substring(0, 10) + '…' : trimmed;
  }

  goToPricing() {
    this.router.navigate(['/pricing']);
  }

  /**
   * Navigates to homepage or gender page if logged in.
   */
  openHome() {
    this.emptyData();
    if (this.source === 'category') {
      this.router.navigate(['mode-select']);
    } else {
      this.checkProfile();
      this.router.navigate(['home']);
    }
  }

  /**
   * Empties the data.
   */
  emptyData() {
    if (this.source !== 'gender') {
      this.promptService.clearPromptId();
      this.categroryService.deleteCategories();
      this.imageService.imageUrl.next('');
      this.imageService.sketchUrl.next('');
      this.imageService.imageSubject.next(null);
      this.breadcrumbService.emptyBreadcrumbList();
      this.checkAttributeService.emptyCheckedAttributesList();
    }
  }

  /**
   * Log out.
   */
  logout() {
    this.openHome();
    this.authService.logout().subscribe(() => {
      this.userService.clearUserDetails();
    });
  }
}
