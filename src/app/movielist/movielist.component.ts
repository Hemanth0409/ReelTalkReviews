import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { MovieList } from 'src/models/movieList';
import { AuthService } from 'src/services/auth.service';
import { MovieDetailsService } from 'src/services/movie-details.service';
@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {

  constructor(private movieService: MovieDetailsService, private auth: AuthService) { }
  movieList: MovieList[] = [];
  userRole!: string;
  colDefs: ColDef[] = [
    // { field: 'movieId'},
    { field: 'movieTitle' },
    { field: 'movieType' },
    // { field: 'moviePoster' },
    { field: 'movieRatingOverall' },
    { field: 'filmCertificationId' },
    // { field: 'isDeleted' },
    // { field: 'createDate' },
    // { field: 'ModifiedDate' },
    {field:'releaseDate'}
  ]
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }
  ngOnInit(): void {
    this.userRole=this.auth.getRole();
    this.movieService.getMovieDetails().subscribe({
      next: (res) => {
        this.movieList = res;
      },
      error(err) {
        console.log(err);
      },
    })
  }
  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    params.api.sizeColumnsToFit();
  }
}
