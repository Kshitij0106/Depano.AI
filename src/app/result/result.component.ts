import { Component, OnInit } from '@angular/core';
import { PromptService } from '../generate/services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  image!: string;
  email!: string;

  constructor(
    private promptService: PromptService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private checkAttributeService: CheckedAttributesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getUserData();
    this.sendRequest();
  }

  ngOnInit(): void {
    this.disableBackButton();
  }

  /**
   * Navigates to homepage.
   */
  openHome() {
    this.emptyData();
    this.router.navigate(['gender']);
  }

  /**
   * Get user data from details stored in session storage.
   */
  getUserData() {
    this.email = this.userService.getEmail() || '';
  }

  /**
   * Sends a request to the prompt service to retrieve image and updates the 'image' property accordingly.
   */
  sendRequest() {
    this.promptService.sendPrompt(this.email).subscribe((result) => {
      this.image = result.url;
      if (result.status === 'Success') {
        this.userService.updateCredits();
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  /**
   * Sends a request again to the prompt service to retrieve image and updates the 'image' property accordingly.
   */
  regenerate() {
    this.getUserData();
    this.promptService.regenerate(this.email).subscribe((result) => {
      this.image = result.url;
      if (result.status === 'Success') {
        this.userService.updateCredits();
      } else {
        this.toastr.error(result.message);
      }
    });
  }

  /**
   * Empties the data.
   */
  emptyData() {
    this.promptService.emptyPrompt();
    this.breadcrumbService.emptyBreadcrumbList();
    this.checkAttributeService.emptyCheckedAttributesList();
  }

  disableBackButton() {
    // Add an initial dummy state
    history.pushState(null, '', window.location.href);

    // Listen for back and forward buttons (popstate event)
    window.addEventListener('popstate', (event) => {
      // Replace the state to prevent the back button from navigating
      history.pushState(null, '', window.location.href);
    });
  }
}
