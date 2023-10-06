import { Component, Input, OnInit } from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { FilmCertifications } from 'src/models/filmCertification';
import { MovieList } from 'src/models/movieList';
import { MovieDetailsService } from 'src/services/movie-details.service';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  constructor(private router: Router, private movieService: MovieDetailsService) { }
  ratingCount: number = 0; // Initialize with zero
  filmCertification: FilmCertifications = {
    filmCertificationId: 0,
    filmCertificationType: '',
    definition: '',
    movieId: 0
  };
  ngOnInit(): void {
    console.log(this.movieDetail);
    // this.movieService.getCertificationId().subscribe((res) => {
    //   this.filmCertification = res;
    //   console.log(this.filmCertification)
    // })
  }

  @Input() movieDetail!: MovieList;
  movieId!: number;
  viewMovie(id: number) {
    this.movieId = id;
    return this.router.navigate(['viewMovie/' + id])
  }
}
