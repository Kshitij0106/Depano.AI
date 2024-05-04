import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'DEPANO AI';
  email: string = '';
  emailError: boolean = false;
  passError: boolean = false;
  password: string = '';

  constructor(private router: Router) {}

  /**
   * Navigates to homepage.
   * Empties the breadcrumb list.
   */
  openHome() {
    this.router.navigate(['home']);
  }

  validate() {
    if (this.email === '') {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
    if (this.password === '') {
      this.passError = true;
    } else {
      this.passError = false;
    }
    if (this.email !== '' && this.password !== '') {
      console.log(this.email, this.password);
      this.router.navigate(['gender']);
    }
  }
}
