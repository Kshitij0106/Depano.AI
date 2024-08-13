import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { PromptService } from '../generate/services/prompt.service';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
    private checkAttributeService: CheckedAttributesService
  ) {}

  ngOnInit(): void {
    this.checkProfile();
    this.updateCredits();
  }

  checkProfile() {
    if (this.source === 'home' && !this.authService.isLoggedIn()) {
      this.showProfile = false;
    } else {
      this.showProfile = true;
      this.getUser();
    }
  }

  updateCredits() {
    this.userService.refreshCredits.subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.loggedInUser.name = user.name;
      this.loggedInUser.email = user.email;
      this.loggedInUser.credits = user.credits;
    });
  }

  get background(): string {
    if (this.source === 'gender') {
      return `linear-gradient(${this.colorStart}, ${this.colorEnd})`;
    }
    return '#ece7e7';
  }

  /**
   * Navigates to homepage.
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
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }

  logOut() {
    this.authService.logOut();
    this.openHome();
  }
}
