import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieList } from 'src/models/movieList';
import { environment } from 'src/environment/environment'
@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  movieDetails = environment.movieDetail;

  constructor(private http:HttpClient) { }
  getMovieDetails(){
   return this.http.get<MovieList[]>(this.movieDetails);

  }

}

