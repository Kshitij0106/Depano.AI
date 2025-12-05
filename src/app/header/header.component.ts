import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { PromptService } from '../generate/services/prompt.service';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { EditService } from '../services/edit.service';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

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
    userId: '',
    userName: '',
    credits: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private promptService: PromptService,
    private editService: EditService,
    private checkAttributeService: CheckedAttributesService
  ) {}

  ngOnInit(): void {
    this.checkProfile();
    this.updateUserDetails();
  }

  /**
   * Show Profile dropdown on homepage only if logged in.
   */
  checkProfile() {
    if (this.source === 'home' && !this.authService.isLoggedIn()) {
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
        this.loggedInUser.userId = user.userId;
        this.loggedInUser.userName =
          user.userName || this.userService.getUserName();
        this.loggedInUser.credits = user.credits;
      });
    }
  }

  /**
   * Truncates username to 10 characters with ellipsis if longer
   */
  getUsername(name: string): string {
    if (!name) return '';

    const fullname = name.trim().split(' ');
    const firstName = fullname[0] || '';
    const lastName = fullname.length > 1 ? fullname[1] : '';

    let displayName = firstName;

    if (firstName.length < 4 && lastName) {
      displayName = `${firstName} ${lastName}`;
    }

    return displayName.length > 10 ? displayName.substring(0, 10) : displayName;
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
      this.promptService.emptyPrompt();
      this.editService.imageUrl.next('');
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
