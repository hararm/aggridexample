import { Component } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
  selector: 'full-width-cell',
  templateUrl: './name-and-age-renderer.component.html',
  styleUrls: ['./name-and-age-renderer.component.css']
})
export class NameAndAgeRendererComponent implements  ICellRendererAngularComp {
  private params: any;
  public values: string;

  refresh(params: any): boolean {
    return undefined;
  }
  agInit(params: any): void {
    this.params = params;
    this.values = `name: ${params.data.name}, age: ${params.data.age}, gender: ${params.data.gender}`
  }

  constructor() { }


}
