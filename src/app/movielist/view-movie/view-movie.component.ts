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
  movieList: MovieList[] = [];
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
    this.movieService.getMovieDetails().subscribe({
      next: (res) => {
        this.movieList = res;
      },
      error(err) {
        console.log(err);
      },
    });
    this.numUserId = Number(this.currentUserId);
    this.numMovieId = Number(this.currentMovieId);
    this.userId = new FormControl(this.numUserId);
    this.movieId = new FormControl(this.numMovieId);
    this.rating = new FormControl('', [Validators.required]);
    this.review = new FormControl('', [Validators.required]);
    this.reviewDetail = new FormGroup({
      movieId: this.movieId,
      userId: this.userId,
      rating: this.rating,
      review: this.review,
    });

    // Check if the user has already rated this movie
    this.movieService.getUserRating(this.numUserId, this.numMovieId).subscribe({
      next: (rating) => {
        this.existingRating = rating;
        if (this.existingRating !== null) {
          this.rating.setValue(this.existingRating);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fetchRatingCount();
  }

  fetchRatingCount() {
    this.movieService.getRatingCountForMovie(this.numMovieId).subscribe(
      (count) => {
        this.ratingCount = count;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    if (this.reviewDetail.valid) {
      if (this.existingRating === null) {
        // User hasn't rated this movie before, so create a new rating
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
      } else {
        // User has already rated this movie, so update the existing rating
        this.movieService.updateMovieRating(this.existingRating, this.reviewDetail.value).subscribe({
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
}
