import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridOptions, InMemoryRowModel, NumberFilter, RowNode, TextFilter } from 'ag-grid/main';
import { NameAndAgeRendererComponent } from '../name-and-age-renderer/name-and-age-renderer.component';
import { HeaderComponent } from '../header/header.component';
import { HeaderGroupComponent } from '../header-group/header-group.component';
import 'ag-grid-enterprise/main';

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
      //editType: 'fullRow',
      //groupSuppressAutoColumn: true,
      //suppressAggFuncInHeader: true,
      //groupUseEntireRow: true,
      groupIncludeFooter: true,
      groupSelectsChildren: true,
      //allowContextMenuWithControlKey: true,
      getContextMenuItems: this.getContextMenuItems,
      //fullWidthCellRendererFramework: NameAndAgeRendererComponent,
      defaultColDef: {
        headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
        headerComponentParams: {
          menuIcon: 'fa-bars'
        }
      },
      groupRowRenderer: 'group',
      groupRowRendererParams: {
        checkbox: true,
        innerRenderer: function(params) {return params.node.key;},
      },
      groupColumnDef: {headerName: "Group",
        cellRenderer: 'group',
        cellRendererParams: {
          checkbox: true
        }},
      //groupRowInnerRenderer: function(params) {return params.node.key;},
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
      floatingBottomRowData: [
        {
          annualSalary: 'loading'
        }
      ]
    }
  }

  ngOnInit() {
    this.createColumnDefs();
    this.gridOptions.onFilterChanged = () => {
      // console.log('gridOptions.onFilterChanged ', this.gridOptions.api.getModel());
      this.calcFooter();
    };

    /*    this.gridOptions.isFullWidthCell = (rowNode:RowNode)=> {
     return (rowNode.id === "0") || (parseInt(rowNode.id) % 2 === 0);
     };*/
  }

  private calcFooter() {
    let model = <InMemoryRowModel>this.gridOptions.api.getModel();
    let rowsToCalc = [];
    model.forEachNodeAfterFilter((node: RowNode) => {
      if (!node.group) {
        rowsToCalc.push(node);
      }
    });

    let salResult = rowsToCalc.map(r => r.data.annualSalary).reduce((acc, curr) => acc + curr, 0);
    // console.log('footer result ', seqResult);
    this.gridOptions.api.setFloatingBottomRowData([
      {
        annualSalary: salResult
      }
    ]);
  }

  // private  onFloatingBottomCount(footerRowsToFloat) {
  // var count = Number(footerRowsToFloat);
  // var rows = this.createData(count, 'Total');
  // this.gridOptions.api.setFloatingBottomRowData(rows);
  // }
  //
  // private createData(count, prefix) {
  //   var result = [];
  //   for (var i = 0; i < count; i++) {
  //     result.push({
  //       name: prefix + ' Name ' + i,
  //       age: prefix + ' Age ' + i,
  //       gender: prefix + ' Gender ' + i,
  //       company: prefix + ' Company ' + i,
  //     });
  //   }
  //   return result;
  // }

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

  private createColumnDefs() {
    this.columnDefs = [
      /*{
        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true, suppressFilter: true
      },*/
      {
        headerName: "Employee",
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
     ]
  }

//data gets mapped to the corresponding "field" key of the headers

  private createRowData() {
    this.rowData = [
      {name: "Harry", age: 30, gender: "Male", company: "Odotech", annualSalary: 20000},
      {name: "Sally", age: 28, gender: "Female", company: "Maples", annualSalary: 30000},
      {name: "Alberto", age: 29, gender: "Male", company: "Odotech", annualSalary: 50000},
      {name: "Jack", age: 30, gender: "Male", company: "Odotech", annualSalary: 23000},
      {name: "Sue", age: 28, gender: "Female", company: "Maples", annualSalary: 26000},
      {name: "Jenny", age: 29, gender: "Female", company: "Odotech", annualSalary: 29000}
    ];
    //this.onFloatingBottomCount(1);
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
