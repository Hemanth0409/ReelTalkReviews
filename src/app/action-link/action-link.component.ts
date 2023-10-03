import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-link',
  template: `#{{userId}}`,
  styles: [],
})
export class ActionLinkComponent implements OnInit, ICellRendererAngularComp {
  userId!: number;
  agInit(params: ICellRendererParams): void {
    this.userId = params.value;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  ngOnInit(): void {
  }

}
