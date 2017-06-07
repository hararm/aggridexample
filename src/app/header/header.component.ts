import { Component, ElementRef } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid';

interface HeaderParams extends IHeaderParams {
  menuIcon: string;
}

@Component({
  //selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements IHeaderAngularComp {
  params: HeaderParams;
  private sorted: string;

  agInit(params: HeaderParams): void {
    this.params = params;
    this.params.column.addEventListener('sortChanged', this.onSortChanged.bind(this));
  }

  constructor(private elementRef: ElementRef) {
  }

  onMenuClick() {
    this.params.showColumnMenu(this.querySelector('.customHeaderMenuButton'));
  }

  onSortRequested(order, event) {
    this.params.setSort(order, event.shiftKey);
  }

  onSortChanged() {
    if (this.params.column.isSortAscending()) {
      this.sorted = 'asc';
    }
    else if (this.params.column.isSortDescending()) {
      this.sorted = 'desc';
    }
    else {
      this.sorted = '';
    }

  }

  private querySelector(selector: string) {
    return <HTMLElement>this.elementRef.nativeElement.querySelector(
      '.customHeaderMenuButton', selector);
  }

}
