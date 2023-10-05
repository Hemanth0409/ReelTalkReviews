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
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
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
  movieList: MovieList[] = [];
  reviewDetail!: FormGroup;
  rating!: FormControl;
  review!: FormControl;
  userId!: FormControl;
  movieId!: FormControl;
  currentUserId!: number;
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
    this.currentUserId = Number(this.currentUserId);
    this.currentMovieId = Number(this.currentMovieId); 
    this.userId = new FormControl(this.currentUserId);
    this.movieId = new FormControl(this.currentMovieId);
    this.rating = new FormControl('', [Validators.required]);
    this.review = new FormControl('', [Validators.required]);
    this.reviewDetail = new FormGroup({
      movieId:this.movieId,
      userId:this.userId,
      rating: this.rating,
      review: this.review,
    })
  }
  onSubmit() {
    if (this.reviewDetail.valid) {
      console.log(this.reviewDetail.value);
      this.movieService.postMovieRating(this.reviewDetail.value).subscribe({
        next: () => {
          this.router.navigate(['/celebrities']);
        },
        error: (error) => {

          console.log(error, "djsf");
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
