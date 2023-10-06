import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieList } from 'src/models/movieList';
import { MovieDetailsService } from 'src/services/movie-details.service';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{
  constructor(private router:Router,private movieService:MovieDetailsService){}
  starRating!:number;
  ratingCount: number = 0; // Initialize with zero

  ngOnInit(): void {
  console.log(this.movieDetail);
  this.fetchRatingCount();

  }
  fetchRatingCount() {
    // this.movieService.getRatingCountForMovie(this.currentMovieId).subscribe(
    //   (count) => {
    //     this.ratingCount = count;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }
  @Input() movieDetail!:MovieList;
  movieId!:number;
  viewMovie(id:number){
    this.movieId=id;
    return this.router.navigate(['viewMovie/'+id])
  }
}
