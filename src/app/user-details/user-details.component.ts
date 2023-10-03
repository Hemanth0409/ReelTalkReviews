import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { CellChangedEvent } from 'ag-grid-community/dist/lib/interfaces/iRowNode';
import { Observable } from 'rxjs';
import { UserDetail } from 'src/models/UserDetails';
import { ApiService } from 'src/services/api.service';
import { ActionLinkComponent } from '../action-link/action-link.component';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  constructor(private api: ApiService, private http: HttpClient) { }
  userList: UserDetail[] = [];
  colDefs: ColDef[] = [
    { field: 'userId', },
    { field: 'userName', },
    { field: 'email', },
    { field: 'roleId'},
    { field: 'isDeleted' },
    {field: 'userId', headerName:'Action',cellRenderer:ActionLinkComponent}

  ]
  defaultColDef: ColDef = {
    sortable: true, filter: true
  }
  ngOnInit(): void {
    this.api.getUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.userList = res;
      },
      error(err) {
        console.log(err);
      },
    });
  }


}
