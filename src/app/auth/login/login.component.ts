import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/userAuth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'DEPANO AI';
  // id: string = '';
  idError: boolean = false;
  passError: boolean = false;
  // password: string = '';
  userAuth: UserAuth = {
    id: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  /**
   * Navigates to homepage.
   * Empties the breadcrumb list.
   */
  openHome() {
    this.router.navigate(['home']);
  }

  validate() {
    if (this.userAuth.id === '') {
      this.idError = true;
    } else {
      this.idError = false;
    }
    if (this.userAuth.password === '') {
      this.passError = true;
    } else {
      this.passError = false;
    }
    if (this.userAuth.id !== '' && this.userAuth.password !== '') {
      this.authService.validate(this.userAuth).subscribe((result) => {
        if (result.statusCode == 200) {
          this.authService.saveUserInfo();
          this.toastr.success(result.status);
          this.router.navigate(['gender']);
        } else {
          this.toastr.error(result.status);
        }
      });
    }
  }
}
