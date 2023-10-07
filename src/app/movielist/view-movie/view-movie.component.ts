import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieList } from 'src/models/movieList';
import { AuthService } from 'src/services/auth.service';
import { MovieDetailsService } from 'src/services/movie-details.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-view-movie', 
  template:`<div class="container-fluid bg-dark pb-5" id="main-body">
  <div class="container-fluid  align-items-center d-flex flex-column">
      <div class="row w-100" id="bg-main-row">
          <div class="row text-white fs-1 mt-5 ">
              <p>{{movieList.movieTitle|uppercase}}</p>
              <div class="d-flex align-items-center mt-3">
                  <p class="r-date">{{movieList.movieType|uppercase}}</p>
                  <p class="r-date">&nbsp;&#x2022;</p>
                  <p class="ms-1 r-date">{{movieList.releaseDate|date}}</p>
              </div>

          </div>
          <div class="col-sm-6 col-md-3" id="f-col-poster">
              <img src="{{'https://localhost:7205/'+movieList.moviePoster}}" class="img-fluid" id="sm-poster"
                  alt="movie poster">
          </div>
          <div class="col-sm-6 col-md-7 d-none d-sm-block" id="s-col-poster">
              <img src="{{'https://localhost:7205/'+movieList.moviePoster2}}" class="img-fluid" id="sm-poster"
                  alt="movie poster">
          </div>
          <div class=" col-md-2" id="t-col-poster">
              <div class="row mx-1 h-100 d-flex flex-row" id="rating-card">
                  <div class="card py-2 justify-content-center align-items-center">
                      <p class="fs-5 text-white">MDB Rating</p>
                      <p class="text-secondary fs-4"><i class="fa-solid fa-star" id="gold-star"></i>
                          <b>{{movieList.movieRatingOverall}}({{movieList.ratingCount}})</b>
                      </p>
                  </div>
                  <div class="card justify-content-center align-items-center mt-1">
                      <p class="fs-5 text-white" *ngIf="movieList.filmCertificationId==1">Unrestricted public
                          exhibition(U) </p>
                      <p class="fs-5 text-white" *ngIf="movieList.filmCertificationId==2">Parental guidance for
                          children below age 12 (U/A)</p>
                      <p class="fs-5 text-white" *ngIf="movieList.filmCertificationId==3">Adult (A)</p>

                  </div>
              </div>

          </div>
      </div>
      <div class="row mt-md-1 p-0 w-100 justify-content-center gy-2 gy-lg-0">
          <div class="col-12 col-lg-8" id="fr-col-rating">
              <div class="description text-white text-center text-lg-start mt-md-2 mb-3">
                  <p>{{movieList.movieDescription}}
                  </p>
              </div>
          </div>
          <div class="col-12 col-lg-4" id="fv-col-rating">
              <div class="your-rate px-5 p-md-2">
                  <div class="row text-center text-lg-start">
                      <h4 class="text-white">
                          Your Rating
                      </h4>
                  </div>
                  <form class="example-form container" [formGroup]="reviewDetail"
                      (ngSubmit)="reviewDetail.valid && onSubmit()" novalidate novalidate>
                      <div class="card flex justify-content-center bg-transparent border-0">
                          <p-rating [(ngModel)]="value" [cancel]="false"
                              class="text-center ui-rating text-white justify-content-around" formControlName="rating"
                              [stars]="starsCount"></p-rating>

                      </div>
                      <div class="row mt-2">
                          <mat-form-field class="example-full-width form-group">
                              <input matInput formControlName="review" [errorStateMatcher]="matcher">
                          </mat-form-field>
                      </div>
                      <div class="text-center" *ngIf="!hide">
                          <button mat-raised-button color="primary" type="submit" class="example-full-width col-6">
                              Rate
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  </div>
  <div class="row">
      <div class="col-6 col-lg-3 text-white text-md-end">
          <ul class="list-unstyled ps-3">
              <li>Actor:</li>
          </ul>
      </div>
      <div class="col-6 col-lg-6 text-white">
          <ul class="list-unstyled">
          <li>{{movieList.actor1}}</li>
          </ul>
      </div>
  </div>
  <div class="row">      
      <div class="col-6 col-lg-3 text-white text-md-end">
          <ul class="list-unstyled ps-3">
              <li>Actoress:</li>
          </ul>
      </div>
      <div class="col-6 col-lg-6 text-white">
          <ul class="list-unstyled">
          <li>{{movieList.actor2}}</li>
          </ul>
      </div>
  </div>
  <div class="row">      
      <div class="col-6 col-lg-3 text-white text-md-end">
          <ul class="list-unstyled ps-3">
              <li>Antogonist:</li>
          </ul>
      </div>
      <div class="col-6 col-lg-6 text-white">
          <ul class="list-unstyled">
          <li>{{movieList.actor3}}</li>
          </ul>
      </div>
  </div>
  <div class="row">      
      <div class="col-6 col-lg-3 text-white text-md-end">
          <ul class="list-unstyled ps-3">
              <li>Director:</li>
          </ul>
      </div>
      <div class="col-6 col-lg-6 text-white">
          <ul class="list-unstyled">
          <li>{{movieList.director}}</li>
          </ul>
      </div>
  </div>
  <div class="row">      
      <div class="col-6 col-lg-3 text-white text-md-end">
          <ul class="list-unstyled ps-3">
              <li>Music Director:</li>
          </ul>
      </div>
      <div class="col-6 col-lg-6 text-white">
          <ul class="list-unstyled">
          <li>{{movieList.musicDirector}}</li>
          </ul>
      </div>
  </div>

</div>` ,
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {
  alert: any;
  constructor(private actRoute: ActivatedRoute, private router: Router, private auth: AuthService, private movieService: MovieDetailsService) { }
  currentMovieId!: number;
  numUserId!: number;
  numMovieId!: number;
  movieList: MovieList = {
    movieId: 0,
    movieTitle: '',
    movieType: '',
    moviePoster: '',
    movieRatingOverall: 0,
    filmCertificationId: 0,
    isDeleted: false,
    createDate: new (Date),
    modifiedDate: new (Date),
    releaseDate: new (Date),
    ratingCount: 0,
    movieDescription: '',
    moviePoster2: '',
    actor1: '',
    actor2: '',
    actor3: '',
    director: '',
    musicDirector: ''
  };
  value!: number;
  starsCount: number = 10; // This is the numeric variable for stars.


  reviewDetail!: FormGroup;
  rating!: FormControl;
  review!: FormControl;
  userId!: FormControl;
  movieId!: FormControl;
  currentUserId!: number;
  existingRating: number | null = null;
  ratingCount: number = 0; // Initialize with zero

  matcher = new MyErrorStateMatcher();
  hide!: boolean;
  ngOnInit(): void {
    // const getToken = this.auth.getToken();
    // if (getToken) {
    //   this.hide = false;
    // }else{
    // this.router.navigate(['login']);
    // }
    this.currentUserId = this.auth.getUserID();
    this.currentMovieId = this.actRoute.snapshot.params['id'];
    this.numUserId = Number(this.currentUserId);
    this.numMovieId = Number(this.currentMovieId);
    console.log(this.value);
    this.movieService.getMovieDetailId(this.numMovieId).subscribe({
      next: (res) => {
        this.movieList = res;
        console.log(res)
      },
      error(err) {
        console.log(err);
      },
    });

    this.userId = new FormControl(this.numUserId);
    this.movieId = new FormControl(this.numMovieId);
    this.rating = new FormControl(this.value);
    this.review = new FormControl('');
    this.reviewDetail = new FormGroup({
      movieId: this.movieId,
      userId: this.userId,
      rating: this.rating,
      review: this.review,
    });

  }



  onSubmit() {
    if (this.reviewDetail.valid) {
      console.log(this.reviewDetail.value)
      this.movieService.postMovieRating(this.reviewDetail.value).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
          this.alert.add({
            key: 'tc',
            severity: 'error',
            summary: 'Try again later',
            detail: 'Something went wrong',
          });
        },
      });
    }
  }
}
