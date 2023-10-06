import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieList } from 'src/models/movieList';
import { environment } from 'src/environment/environment'
import { FilmCertifications } from 'src/models/filmCertification';
import { Rating } from 'src/models/rating';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  movieDetails = environment.movieDetail;
  postMovie = environment.postMovie;
  filmCertification = environment.getFilmCertification;
  postMovieRatingUrl = environment.postMovieRating;
  movieDetailId = environment.movieDetailId;
  baseUrl = environment.baseUrl;
  getcertificationId=environment.getCertification;
  constructor(private http: HttpClient) { }
  getMovieDetails() {
    return this.http.get<MovieList[]>(this.movieDetails);
  }
  getMovieDetailId(id: number) {
    return this.http.get<MovieList>(`${this.movieDetailId}/${id}`);
  }
  postMovieDetail(movieForm: MovieList) {
    return this.http.post<MovieList>(this.postMovie, movieForm)
  }
  getFilmCertification() {
    return this.http.get<FilmCertifications[]>(this.filmCertification);
  }
  postMovieRating(ratingForm: Rating) {
    return this.http.post<Rating>(this.postMovieRatingUrl, ratingForm);
  }
  getUserRating(userId: number, movieId: number): Observable<number | null> {
    const url = `${this.baseUrl}/api/MovieRatings/user-rating?userId=${userId}&movieId=${movieId}`;
    return this.http.get<number | null>(url);
  }

  // Make an HTTP PUT or PATCH request to update the user's rating for a specific movie
  updateUserRating(userId: number, movieId: number, newRating: number): Observable<void> {
    const url = `${this.baseUrl}/api/MovieRatings/${userId}/${movieId}`;
    const body = {
      rating: newRating,
    };
    return this.http.put<void>(url, body);
  }
  // getRatingCountForMovie(movieId: number): Observable<number> {
  //   const url = `${this.baseUrl}/api/MovieRatings/count/${movieId}`;
  //   return this.http.get<number>(url);
  // }
  // updateMovieRating(existingRatingId: number, updatedRatingData: any): Observable<any> {
  //   const url = `${this.baseUrl}/api/MovieRatings/${existingRatingId}`;

  //   // Send an HTTP PUT request to update the existing rating
  //   return this.http.put(url, updatedRatingData);
  // }
  // getCertificationId() {
  //   return this.http.get<FilmCertifications>(this.getcertificationId)
  // }
}

