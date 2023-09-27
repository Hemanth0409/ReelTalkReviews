import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormControl,FormGroupDirective,NgForm} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { matchValidator } from 'src/shared/ConfirmPassword';

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
export class LoginComponent implements OnInit{
  constructor( ) { }

  //password hide property
  hide = true;
  signinForm!: FormGroup;
  Email!: FormControl;
  Password!: FormControl;


  forgotpassword!: FormGroup;
  fmail!: FormControl;
  fanswer!: FormControl;
  chpass!: FormControl;
  conchpass!: FormControl;

  validdetail: boolean = false;

  ngOnInit(): void {
    this.Email = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);
    this.signinForm = new FormGroup({
      email: this.Email,
      password: this.Password,
    });
    this.fmail = new FormControl('', [Validators.required]);
    this.fanswer = new FormControl('', [Validators.required]);

    this.chpass = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{6,}$/),
    ],);
    this.conchpass = new FormControl('', [Validators.required, matchValidator('chpass')]);
    this.forgotpassword = new FormGroup({
      fmail: this.fmail,
      fanswer: this.fanswer,
      chpass: this.chpass,
      conchpass: this.conchpass,
    });
  }
  matcher = new MyErrorStateMatcher();

  // onSubmit() {
  //   this.registeration.signIn().subscribe((response) => {
  //     this.user_details = response;
  //     const user = this.user_details.find((a: any) => {
  //       if (
  //         a.email === this.signinForm.value.email &&
  //         a.password === this.signinForm.value.password
  //       ) {
  //         this.registeration.isLoggedIn(a, a.id);
  //         this.registeration.validateAuth(true);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //     if (user) {
  //       localStorage.setItem('token', Math.random().toString());
  //       setTimeout(()=>{this.router.navigate([''])
  //       this.alert.add({
  //         key: 'tc',
  //         severity: 'success',
  //         summary: 'success',
  //         detail: 'Login Successful',
  //       });
  //       this.signinForm.reset();
  //     },200);
      
  //     }
  //     else {
  //       this.alert.add({
  //         key: 'tc',
  //         severity: 'error',
  //         summary: 'e-mail or password not matched',
  //         detail: 'Login Failed',
  //       });
  //       this.signinForm.reset();
  //     }
  //   });
  // }


  // forgotPassword(form: FormGroup) {
  //   this.registeration.signIn().subscribe((response) => {
  //     this.user_details = response;
  //     for (const user of this.user_details) {
  //       if (
  //         user.email === form.value.fmail &&
  //         user.secret === form.value.fanswer
  //       ) {
  //         console.log('success');
  //         this.validdetail = true;
  //       }
  //     }
  //     if (!this.validdetail) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Failed',
  //         text: 'no mail found or incorrect answer'
  //       });
  //       console.log('no');
  //       this.forgotpassword.reset();
  //     }
  //   })
  // }
  // changePassword(Form: FormGroup) {
  //   this.registeration.signIn().subscribe((response) => {
  //     this.user_details = response;
  //     for (const user of this.user_details) {
  //       if (
  //         user.email === Form.value.fmail
  //       ) {
  //         user.password = Form.value.chpass;
  //         user.confirmpassword = Form.value.conchpass;
  //         this.registeration.putUser(user.id, user);
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Success',
  //           text: 'Password Changed Successfully!'
  //         });
  //       }
  //     }
  //   })
  // }
}

