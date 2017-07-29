import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid';
import { isNumber } from 'util';

@Component({
  selector: 'group-row-cell',
  template: `
		<ng-container style="text-overflow:ellipsis; overflow: hidden; font-style: italic">
      <img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/{{val[1]}}.png">
      <span style="cursor: default;">{{val[0]}}</span>
		</ng-container>
	`
})
export class GroupRowRendererComponent implements ICellRendererAngularComp {

  val: string[];

  refresh(params: any): boolean {
    return false;
  }

  agInit(params: ICellRendererParams): void {
    if (params.value) {
      this.val = params.value.split(',');
    }
  }

}
