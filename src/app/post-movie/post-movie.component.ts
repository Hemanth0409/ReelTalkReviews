import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FilmCertifications } from 'src/models/filmCertification';
import { MovieDetailsService } from 'src/services/movie-details.service';
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
  selector: 'app-post-movie',
  templateUrl: './post-movie.component.html',
  styleUrls: ['./post-movie.component.css']
})
export class PostMovieComponent implements OnInit {

  constructor(private alert: MessageService, private router: Router, private movieDetail: MovieDetailsService) { }

  movieDetails!: FormGroup;
  movieTitle!: FormControl;
  movieType!: FormControl;
  moviePoster!: FormControl;
  moviePoster2!: FormControl;
  releaseDate!: FormControl;
  movieDescription!: FormControl;
  filmCertificationId!: FormControl;
  matcher = new MyErrorStateMatcher();
  filmCertificationList!: FilmCertifications | any;
  selectedFilmCertification!: FilmCertifications;
  public response!: { dbPath: '' };


  ngOnInit(): void {

    this.movieTitle = new FormControl('', [Validators.required]);
    this.movieType = new FormControl('', [Validators.required]);
    this.moviePoster = new FormControl('', [Validators.required]);
    this.filmCertificationId = new FormControl('', [Validators.required]);
    this.releaseDate = new FormControl('', [Validators.required]);
    this.movieDescription = new FormControl('', [Validators.required]);
    this.moviePoster2 = new FormControl('', [Validators.required]);

    this.movieDetails = new FormGroup({
      movieTitle: this.movieTitle,
      movieType: this.movieType,
      releaseDate: this.releaseDate,
      filmCertificationId: this.filmCertificationId,
      movieDescription: this.movieDescription,
      moviePoster: this.moviePoster,
      moviePoster2:this.moviePoster2
    });
    this.movieDetail.getFilmCertification().subscribe(
      (res) => {
        this.filmCertificationList = res;
        console.log(this.filmCertificationList);
      });


  }
  public uploadFinished = (event: any) => {
    this.response = event;
    this.moviePoster.setValue(this.response.dbPath);
  }
  public uploadFinished2 = (event: any) => {
    this.response = event;
    this.moviePoster2.setValue(this.response.dbPath);
  }
  onSubmit() {
    if (this.movieDetails.valid) {
      console.log(this.movieDetails.value)
      this.movieDetail.postMovieDetail(this.movieDetails.value).subscribe(
        {
          next: () => {
            this.router.navigate(['/movie']);
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



