import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ApiService } from 'src/app/shared/api/api.service';
import { BtnCellRenderer } from 'src/app/shared/button-cell-renderer/button-cell-renderer.component';

@Component({
  selector: 'app-songs-grid',
  templateUrl: './songs-grid.component.html',
  styleUrls: ['./songs-grid.component.scss'],
})
export class SongsGridComponent {
  @ViewChild('content') static content: any;
  @Input() rowData: any[];

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public columnDefs: ColDef[];
  frameworkComponents: { btnCellRenderer: any };
  closeResult: string;
  

  constructor(private apiSrvc: ApiService, private router: Router) {
    this.columnDefs = [
      {
        field: 'id',
        width: 5,
        headerName: '',
        onCellClicked: function (field: any) {
          router.navigate([`song/${field.value}`])
        },
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          icon: 'eye',
        },
      },

      { field: 'title' },
      { field: 'artist' },
      { field: 'genre.name', headerName: 'Genre' },
    ];

    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(this.rowData);
    this.gridApi.sizeColumnsToFit();
  }
}


