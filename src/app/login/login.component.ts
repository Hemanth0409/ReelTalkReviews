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
    private auth: AuthService, private userDetail: UserDetailService) { }

  //password hide property
  hide = true;
  signinForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;
  userDetails: UserDetail[] = [];


  validdetail: boolean = false;

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.signinForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
  matcher = new MyErrorStateMatcher();

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
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Try again later',
              detail: 'Something went wrong',
            });
          }
        });
    }
  }
}

