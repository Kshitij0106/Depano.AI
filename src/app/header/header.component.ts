import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { PromptService } from '../generate/services/prompt.service';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { EditService } from '../services/edit.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {
  title = 'DEPANO AI';
  @Input() source: string = '';
  showProfile: boolean = true;

  colorStart: string = '#444543';
  colorEnd: string = '#c1bebe';

  loggedInUser: User = {
    name: '',
    email: '',
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
    this.updateCredits();
  }

  /**
   * Show Profile dropdown on homepage only if logged in.
   */
  checkProfile() {
    if (this.source === 'home' && !this.authService.isLoggedIn()) {
      this.showProfile = false;
    } else {
      this.showProfile = true;
      this.getUser();
    }
  }

  /**
   * Update credits after successfull generation of image.
   */
  updateCredits() {
    this.userService.refreshCredits.subscribe(() => {
      this.getUser();
    });
  }

  /**
   * Get user data from DB from user details stored in session storage.
   */
  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser.name = user.name;
      this.loggedInUser.email = user.email;
      this.loggedInUser.credits = user.credits;
    });
  }

  /**
   * @returns {string} - Background color code depending on the page.
   */
  get background(): string {
    if (this.source === 'gender') {
      return `linear-gradient(${this.colorStart}, ${this.colorEnd})`;
    }
    return '#ece7e7';
  }

  /**
   * Navigates to homepage or gender page if logged in.
   */
  openHome() {
    this.emptyData();
    if (this.source === 'category') {
      this.router.navigate(['gender']);
    } else {
      this.checkProfile();
      this.router.navigate(['home']);
    }
  }

  /**
   * Empties the data.
   */
  emptyData() {
    this.editService.imageUrl.next('');
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }

  /**
   * Log out.
   */
  logOut() {
    this.authService.logOut();
    this.openHome();
  }

  ngOnDestroy(): void {
    this.userService.refreshCredits.unsubscribe();
  }
}
