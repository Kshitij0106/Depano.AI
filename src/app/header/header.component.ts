import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { ImageService } from '../services/image.service';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { AuthService } from '../auth/services/auth.service';
import { User, UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CategoryService } from '../generate/services/category.service';

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

  loggedInUser: User | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private imageService: ImageService,
    private categroryService: CategoryService,
    private checkAttributeService: CheckedAttributesService,
  ) {}

  ngOnInit(): void {
    this.userService.userDetails.subscribe((user) => {
      if (this.source === 'home' || this.source === 'pricing') {
        this.showProfile = user !== null;
      } else {
        this.showProfile = true;
      }

      this.loggedInUser = user;
    });
  }

  getUsername(name: string | undefined): string {
    if (!name) return '';

    const trimmed = name.trim();

    if (trimmed.includes(' ')) {
      return trimmed.split(' ')[0].substring(0, 10);
    }

    // No space — truncate with ellipsis if too long
    return trimmed.length > 10 ? trimmed.substring(0, 10) + '…' : trimmed;
  }

  goToPricing() {
    this.router.navigate(['/pricing']);
  }

  openHome() {
    this.emptyData();
    if (this.source === 'category') {
      this.router.navigate(['mode-select']);
    } else {
      this.router.navigate(['home']);
    }
  }

  emptyData() {
    if (this.source !== 'gender') {
      this.categroryService.deleteCategories();
      this.imageService.clearImageData();
      this.breadcrumbService.emptyBreadcrumbList();
      this.checkAttributeService.emptyCheckedAttributesList();
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.clearUserInfo();
      this.openHome();
    });
  }
}
