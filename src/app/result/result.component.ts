import { Component, OnInit } from '@angular/core';
import { PromptService } from '../generate/services/prompt.service';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Router } from '@angular/router';
import { CheckedAttributesService } from '../generate/services/checked-attributes.service';
import { UserService } from '../services/user.service';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  image!: string;
  email!: string;
  result: string = '';
  error: boolean = false;

  editMode: boolean = false;

  constructor(
    private promptService: PromptService,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService,
    private checkAttributeService: CheckedAttributesService,
    private editService: EditService,
    private router: Router
  ) {
    this.getUserData();
    this.sendRequest();

    this.image= "https://hips.hearstapps.com/hmg-prod/images/guest-is-seen-wearing-white-mini-skirt-polo-outside-lacoste-news-photo-1684172383.jpg";

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
        this.result = 'success';
        this.error = false;
        this.userService.updateCredits();
      } else {
        this.error = true;
        if (result.message.includes('network')) {
          this.result = 'networkIssue';
        } else if (result.message.includes('credits')) {
          this.result = 'creditIssue';
        } else if (result.message.includes('banned')) {
          this.result = 'bannedIssue';
        }
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
        this.result = 'success';
        this.error = false;
        this.userService.updateCredits();
      } else {
        this.error = true;
        if (result.message.includes('network')) {
          this.result = 'networkIssue';
        } else if (result.message.includes('credits')) {
          this.result = 'creditIssue';
        } else if (result.message.includes('banned')) {
          this.result = 'bannedIssue';
        }
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

  edit(){
    console.log("EditMode Activated!");
    
    this.editMode = !this.editMode;
    this.editService.setImageUrl(this.image);
    this.router.navigate(['edit']);
  }
}
