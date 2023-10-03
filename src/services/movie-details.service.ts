import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieList } from 'src/models/movieList';
import { environment } from 'src/environment/environment'
import { FilmCertifications } from 'src/models/filmCertification';
@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  movieDetails = environment.movieDetail;
  postMovie = environment.postMovie;
  filmCertification=environment.getFilmCertification;
  constructor(private http: HttpClient) { }
  getMovieDetails() {
    return this.http.get<MovieList[]>(this.movieDetails);
  }
  postMovieDetail(movieForm: MovieList) {
    return this.http.post<MovieList>(this.postMovie,movieForm)
  }
  getFilmCertification(){
    return this.http.get<FilmCertifications[]>(this.filmCertification);
  }
}

