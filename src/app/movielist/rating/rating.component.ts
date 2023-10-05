import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieList } from 'src/models/movieList';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit{
  constructor(private router:Router){}
  starRating!:number;
  ngOnInit(): void {
  console.log(this.movieDetail)
  }
  @Input() movieDetail!:MovieList;
  movieId!:number;
  viewMovie(id:number){
    this.movieId=id;
    return this.router.navigate(['viewMovie/'+id])
  }
}
