import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { MovieList } from 'src/models/movieList';
import { AuthService } from 'src/services/auth.service';
import { MovieDetailsService } from 'src/services/movie-details.service';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {
  starRating!: number;
  constructor(private movieService: MovieDetailsService, private auth: AuthService, private datePipe: DatePipe) { }
  movieList: MovieList[] = [];
  userRole!: string;
  colDefs: ColDef[] = [
    { field: 'movieTitle' },
    { field: 'movieType' },
    { field: 'movieRatingOverall' },
    { field: 'filmCertificationId' },
    {
      field: 'releaseDate', cellRenderer: (params: ICellRendererParams) => {
        return `<p>${this.datePipe.transform(params.value)}</p>`;
      }
    }
  ]
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }

  // Add a property to store star ratings for each movie
  movieRatings: { [movieId: number]: number } = {};
  searchText: any;
  ngOnInit(): void {
    this.userRole = this.auth.getRole();
    this.movieService.getMovieDetails().subscribe({
      next: (res) => {
        this.movieList = res;
      },
      error(err) {
        console.log(err);
      },
    });
    this.auth.searchTerm.subscribe((res) => {
      this.searchText = res;
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
