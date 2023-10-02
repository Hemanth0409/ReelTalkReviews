import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterationService } from 'src/services/registration.service';
import { matchValidator } from 'src/shared/ConfirmPassword'
import { UserDetail } from 'src/models/UserDetails'
import { AuthService } from 'src/services/auth.service';
import { UserDetailService } from 'src/services/user-detail.service';
import { TokenApiModel } from 'src/models/tokenApi.model';
import { ResetPasswordService } from 'src/services/reset-password.service';
import Swal from 'sweetalert2';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private registeration: RegisterationService, private router: Router, private alert: MessageService,
    private auth: AuthService, private userDetail: UserDetailService, private resetPasswordService: ResetPasswordService) { }

  //password hide property
  hide = true;
  signinForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  userDetails: UserDetail[] = [];
  Femail: string = "";
  validdetail: boolean = false;

  resetPassword: string = "";
  isValidEmail!: boolean;

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.signinForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  matcher = new MyErrorStateMatcher();
  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;

  }
  confirmToSend() {
    if (this.checkValidEmail(this.resetPassword)) {
      console.log(this.resetPassword);
      this.resetPasswordService.sendResetPasswordLink(this.resetPassword).subscribe({
        next: (res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'Reset Success!!'
          })
          this.resetPassword = "";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error: (err) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'error',
            title: 'Somting went wrong'
          })
        }
      })
    }
  }
  onSubmit() {
    if (this.signinForm.valid) {
      this.registeration.signIn(this.signinForm.value).subscribe(
        {
          next: (res) => {
            this.auth.storeToken(res.accessToken);
            this.auth.storeRefreshToken(res.refreshToken);
            const tokenPayload = this.auth.decodeToken();
            this.userDetail.setFullName(tokenPayload.unique_name);
            this.userDetail.setRole(tokenPayload.role);
            console.log(tokenPayload.role)

            this.router.navigate(['home']);
          },
          error: (err) => {
            console.log(err)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true,
            })
            Toast.fire({
              icon: 'error',
              title: 'Somting went wrong'
            })
          }
        });
    }
  }
}

