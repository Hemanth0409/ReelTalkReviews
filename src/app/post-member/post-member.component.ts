import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CelebritiesService } from 'src/services/celebrities.service';
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
  selector: 'app-post-member',
  templateUrl: './post-member.component.html',
  styleUrls: ['./post-member.component.css'],
  
})
export class PostMemberComponent implements OnInit{
  genderValue!:FormControl;
  genderType: string[] = ['Male', 'Female'];
  constructor(private alert: MessageService, private router: Router,private member:CelebritiesService){}
  memberDetail!: FormGroup;
  memberName!: FormControl;
  memberPic!: FormControl;
  dateOfBirth!: FormControl;
  memberDescription!:FormControl;
  gender!: FormControl;
  place!: FormControl;
  isMusicDirector!: FormControl;
  isDirector!: FormControl;
  isActor!: FormControl;
  isProducer!: FormControl;
  isCinematographer!: FormControl;
  isWriter!: FormControl;
  isDeleted!: FormControl;
  matcher = new MyErrorStateMatcher();



  ngOnInit(): void {

    this.memberName = new FormControl('', [Validators.required]);
    this.memberPic = new FormControl('', [Validators.required]);
    this.dateOfBirth = new FormControl('', [Validators.required]);
    this.memberDescription = new FormControl('', [Validators.required]);
    this.place = new FormControl('', [Validators.required]);
    this.gender = new FormControl('', [Validators.required]);
    this.genderValue = new FormControl('', [Validators.required]);
    this.memberDetail = new FormGroup({
      memberName: this.memberName,
      // memberPic: this.memberPic,
      dateOfBirth:this.dateOfBirth,
      memberDescription: this.memberDescription,
      gender:this.genderValue,
      place:this.place,
    });
    
   
  }

  onSubmit() {    
    if (this.memberDetail.valid) {
      console.log(this.memberDetail.value);
      this.member.postMemberDetail(this.memberDetail.value).subscribe(
        {
          next: () => {
            this.router.navigate(['/celebrities']);
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
      );
    }
  }
}