import { Component } from '@angular/core';
import { IHeaderGroupAngularComp } from 'ag-grid-angular';
import { IHeaderGroupParams } from 'ag-grid';

@Component({
  //selector: 'app-header-group',
  templateUrl: './header-group.component.html',
  styleUrls: ['./header-group.component.css']
})
export class HeaderGroupComponent implements IHeaderGroupAngularComp {
  params: IHeaderGroupParams;
  expanded: boolean = true;

  agInit(params: IHeaderGroupParams): void {
    this.params = params;
    this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandedChanged.bind(this));
  }

  expandOrCollapse() {
    this.params.setExpanded(!this.expanded);
  }

  onExpandedChanged(){
    this.expanded = this.params.columnGroup.getOriginalColumnGroup().isExpanded();
  }

  constructor() { }


}
