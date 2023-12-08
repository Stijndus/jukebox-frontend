import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

// app/button-cell-renderer.component.ts

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <ng-container *ngIf="!params.modal"> <i class="fa-solid fa-{{params.icon}}" (click)="btnClickedHandler($event)"></i> </ng-container>
    <ng-container *ngIf="params.modal"> <i data-bs-toggle="modal" data-bs-target="#editModal" class="fa-solid fa-{{params.icon}}"></i> </ng-container>
  `,
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(args: any) {
    this.params.clicked(this.params.value);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
