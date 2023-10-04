import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { FilmIndustryMembers } from 'src/models/filmIndustryMembers';
import { AuthService } from 'src/services/auth.service';
import { CelebritiesService } from 'src/services/celebrities.service';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent implements OnInit {
  memberList: FilmIndustryMembers[] = []
  userRole!: string;
  colDefs: ColDef[] = [
    { field: 'memberName' },
    { field: 'dateOfBirth' },
    { field: 'memberDescription' },
    { field: 'gender' },
    { field: 'place' },
   ]
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }
  constructor(private members: CelebritiesService,private auth:AuthService) { }
  ngOnInit(): void {
    this.userRole=this.auth.getRole();
    this.members.getFilmIndustyMembers().subscribe({
      next: (res) => {
        this.memberList = res;
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


