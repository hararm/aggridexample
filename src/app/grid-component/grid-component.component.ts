import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridOptions, InMemoryRowModel, NumberFilter, RowNode, TextFilter } from 'ag-grid/main';
import { NameAndAgeRendererComponent } from '../name-and-age-renderer/name-and-age-renderer.component';
import { HeaderComponent } from '../header/header.component';
import { HeaderGroupComponent } from '../header-group/header-group.component';
import 'ag-grid-enterprise/main';
import {GroupRowRendererComponent} from "../renderes/group-renderer.component";

interface  Country {
  code: string;
  name: string;
}


@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {

  private gridOptions: GridOptions;
  public rowData:any[];
  private columnDefs:any[];

  constructor() {
    this.gridOptions = {
      enableFilter: true,
      floatingFilter:true,
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      // editType: 'fullRow',
      // groupSuppressAutoColumn: true,
      // suppressAggFuncInHeader: true,
      groupRowInnerRendererFramework: GroupRowRendererComponent,
      groupUseEntireRow: true,
      // groupIncludeFooter: true,
      groupSelectsChildren: true,
      // allowContextMenuWithControlKey: true,
      getContextMenuItems: this.getContextMenuItems,
      // fullWidthCellRendererFramework: NameAndAgeRendererComponent,
      defaultColDef: {
        headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
        headerComponentParams: {
          menuIcon: 'fa-bars'
        }
      },
      /*autoGroupColumnDef: {
        headerName: 'Country',
        field: 'country',
        comparator: this.countryComparar,
        cellRenderer: this.countryCellRenderer,
        cellRendererParams: {
          checkbox: true,
          innerRenderer: this.countryCellRenderer,
        },

        },*/
      getRowStyle: function(params) {
        if (params.node.floating) {
          return {'font-weight': 'bold'}
        }
      },
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
        this.calcFooter();
      },
      animateRows: true,
      /*floatingBottomRowData: [
        {
          annualSalary: 'loading'
        }
      ]*/
    }
  }


  ngOnInit() {
    this.createColumnDefs();
    this.gridOptions.onFilterChanged = () => {
      // console.log('gridOptions.onFilterChanged ', this.gridOptions.api.getModel());
      this.calcFooter();
    };

  }

  private grValueGetter(params) {
    return params.value;
  }

  private calcFooter() {
    let model = <InMemoryRowModel>this.gridOptions.api.getModel();
    let rowsToCalc = [];
    model.forEachNodeAfterFilter((node: RowNode) => {
      if (!node.group) {
        rowsToCalc.push(node);
      }
    });

   /* let salResult = rowsToCalc.map(r => r.data.annualSalary).reduce((acc, curr) => acc + curr, 0);
    // console.log('footer result ', seqResult);
    this.gridOptions.api.setPinnedBottomRowData([
      {
        annualSalary: salResult
      }
    ]);*/
  }

 /* private onFloatingBottomCount(footerRowsToFloat) {
    var count = Number(footerRowsToFloat);
    var rows = this.createData(count, 'Total');
    this.gridOptions.api.setFloatingBottomRowData(rows);
  }

  private createData(count, prefix) {
    var result = [];
    for (var i = 0; i<count; i++) {
      result.push({
        athlete: prefix + ' Athlete ' + i,
        age: prefix + ' Age ' + i,
        country: prefix + ' Country ' + i,
        year: prefix + ' Year ' + i,
        date: prefix + ' Date ' + i,
        sport: prefix + ' Sport ' + i
      });
    }
    return result;
  }
*/

  private getContextMenuItems(params) {
    var result = [
      { // custom item
        name: 'Alert ' + params.value,
        action: function () {window.alert('Alerting about ' + params.value); },
        cssClasses: ['redFont', 'bold']
      },
      { // custom item
        name: 'Always Disabled',
        disabled: true
      },
      { // custom item
        name: 'Windows',
        shortcut: 'Alt + W',
        action: function() { console.log('Windows Item Selected'); },
        icon: '<img class="x-tree-icon-leaf"> <span class="x-tree-icon-text">Hello</span>'
      },
      { // custom item
        name: 'Mac',
        shortcut: 'Alt + M',
        action: function() { console.log('Mac Item Selected'); },
        icon: '<img class="x-tree-icon-leaf"> <span class="x-tree-icon-text">Hello</span>'
      }, // built in separator
      'separator',
      { // custom item
        name: 'Checked',
        checked: true,
        action: function() { console.log('Checked Selected'); },
        icon: '<img class="x-tree-icon-leaf"> <span class="x-tree-icon-text">Hello</span>'
      }, // built in copy item
      'copy'
    ];
    return result;
  }
  private onCellContextMenu($event) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private countryCellRenderer(params) {
    // get flags from here: http://www.freeflagicons.com/
    if (params.value === "" || params.value === undefined || params.value === null) {
      return null;
    } else {
      let val = params.value;
      if (!val || typeof val === 'string') {
        return '<span style="cursor: default;">' + val + '</span>';
      } else {
        let flag = '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' + val.code + '.png">';
        return '<span style="cursor: default;">' + flag + ' ' + val.name + '</span>';
      }

    }
  }

  private countryComparar(val1: Country, val2: Country) {
    if (!val1 && !val2) {
      return 0;
    }
    if (!val1) {
      return -1;
    }
    if (!val2) {
      return 1;
    }
    let str1: string = <string>val1.name;
    let str2: string = <string>val2.name;
    return str1.localeCompare(str2);
  }


  private createColumnDefs() {
    this.columnDefs = [
      /*{
        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, suppressFilter: true
      },*/
      {
        headerName: 'Employee',
        headerGroupComponentFramework: HeaderGroupComponent,
        children: [
          {
            headerName: 'Name',
            field: 'name',
            width: 150,
            filter: 'text',
            editable: true,
          },
          {
            headerName: 'Age',
            field: 'age',
            width: 100,
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
          },
          {
            headerName: 'Gender',
            field: 'gender',
            width: 100,
            filter: 'text',
            editable: true,
            enableRowGroup: true,
            enablePivot: true
          },
          ]
      },
      {
        headerName: 'Company',
        children: [
          {
            headerName: 'Company Name',
            field: 'company',
            width: 100,
            filter: 'set'
          },
          {
            headerName: 'Annual Salary',
            field: 'annualSalary',
            width: 200,
            enableValue: true,
/*            floatingCellRenderer: function(params) {
              return '<i>'+params.value+'</i>'
            },*/
            aggFunc: 'sum'
          },
          ]
       },
      {
        headerName: 'Country',
        field: 'country',
        width: 200,
        filter: 'set',
        keyCreator: this.countryKeyCreator,
        cellRenderer: this.countryCellRenderer,
        comparator: this.countryComparar,
        rowGroup: true,
        enableRowGroup: true,
        rowGroupIndex: 0,
      },
     ]
  }

  private countryKeyCreator(params) {
    let countryObj: Country = params.value;
    var key = countryObj.name + ',' + countryObj.code;
    return key;
  }

// data gets mapped to the corresponding "field" key of the headers

  private createRowData() {
    this.rowData = [
      {name: "Harry", age: 30, gender: "Male", company: "Odotech", annualSalary: 20000, country: { code: 'gb', name: 'United Kingdom'}},
      {name: "Sally", age: 28, gender: "Female", company: "Maples", annualSalary: 30000, country: { code: 'fr', name: 'France'}},
      {name: "Alberto", age: 29, gender: "Male", company: "Odotech", annualSalary: 50000, country: { code: 'de', name: 'Germany'}},
      {name: "Jack", age: 30, gender: "Male", company: "Odotech", annualSalary: 23000, country: { code: 'it', name: 'Italy'}},
      {name: "Sue", age: 28, gender: "Female", company: "Maples", annualSalary: 26000, country: { code: 'it', name: 'Italy'}},
      {name: "Jenny", age: 29, gender: "Female", company: "Odotech", annualSalary: 29000, country: {  code: 'gb', name: 'United Kingdom'}}
    ];
    // this.onFloatingBottomCount(1);
  }

  onChange(e) {
    this.gridOptions.api.showToolPanel(e.target.checked);
  }

  onModelUpdated() {
    this.calcFooter();
  }


  onColumnRowGroupOpened($event) {
    console.log('onColumnEvent: ' + $event.columnGroup.isExpanded());
    if(!$event.columnGroup.isExpanded())
    {
      this.gridOptions.columnApi.setColumnVisible('age', false)
      this.gridOptions.columnApi.setColumnVisible('gender', false)
    }else {
      this.gridOptions.columnApi.setColumnVisible('age', true)
      this.gridOptions.columnApi.setColumnVisible('gender', true)
    }
  }

  onColumnRowGroupChanged($event) {
    console.log('onColumnRowGroupChanged: ' + $event);
  }

  private isAllGroupsCollapsed() : boolean {
    let result: boolean = true;
    let model = <InMemoryRowModel>this.gridOptions.api.getModel();
    try {
      model.forEachNode(function (node: RowNode) {
        if(node.expanded){
          throw stop;
        }
      })
    } catch(e) {
      if(e === stop) {
        result = false;
      }
    }
    return result;
}

  expandCopllpseGroups() {
    this.isAllGroupsCollapsed()? this.gridOptions.api.expandAll() : this.gridOptions.api.collapseAll();
    this.gridOptions.groupRemoveSingleChildren = !this.gridOptions.groupRemoveSingleChildren;
  }
 }
