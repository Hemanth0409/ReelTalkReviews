import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterationService } from 'src/services/registration.service';
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
} @Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registeration: RegisterationService, private alert: MessageService, private router: Router) { }

  UserDetail!: FormGroup;
  userName!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  hide = true;
  c_hide = true;
  displayPic!: FormControl;
  characterName: Array<string> = [];
  avatarList: any[] = [];
  selected_Avatar: string = '';
  matcher = new MyErrorStateMatcher();


  ngOnInit(): void {

    this.userName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.characterName = ["Punk", "Asian", "Afrohair", "Normiefemale", "Older", "Firehair", "Batman", "Wonder", "Superman", "Aesthetic", "Monkey", "Hero", "Villain", "Happy", "Romeo", "Cute", "Cool", "Angry", "Crazy"];
    for (const charname of this.characterName) {
      this.avatarList.push("https://api.multiavatar.com/" + charname + ".png?apikey=2PhfABEQ49tC1k");
    }
    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      ),
    ]);

    this.confirmPassword = new FormControl('', [
      Validators.required,
      matchValidator('password'),
    ]);
    this.displayPic = new FormControl('', [Validators.required]);


    this.UserDetail = new FormGroup({
      userName: this.userName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      avatar: this.displayPic,
    });
  }
  avatar_click(img: string) {
    this.selected_Avatar = img;
  }
  onSubmit() {
    if (this.UserDetail.valid) {
      this.registeration.register(this.UserDetail.value).subscribe(
        {
          next: () => {
            this.router.navigate(['login']);
          },
          error: (error) => {
            console.log(error)
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Try again later',
              detail: 'Something went wrong',
            });
          }
        }
      );;
    }
  }
}



