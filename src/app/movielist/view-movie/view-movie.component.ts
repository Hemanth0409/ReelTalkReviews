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
  templateUrl: './view-movie.component.html',
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
    movieDescription: ''
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

  ngOnInit(): void {
    this.currentUserId = this.auth.getUserID();
    this.currentMovieId = this.actRoute.snapshot.params['id'];
    this.numUserId = Number(this.currentUserId);
    this.numMovieId = Number(this.currentMovieId);
    console.log(this.value);
    this.movieService.getMovieDetailId(this.numMovieId).subscribe({
      next: (res) => {
        this.movieList = res;
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
          this.router.navigate(['/movie']);
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
