import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgGridModule } from 'ag-grid-angular/main';

import { AppComponent } from './app.component';
import { GridComponent } from './grid-component/grid-component.component';
import { NameAndAgeRendererComponent } from './name-and-age-renderer/name-and-age-renderer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderGroupComponent } from './header-group/header-group.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    NameAndAgeRendererComponent,
    HeaderComponent,
    HeaderGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgGridModule.withComponents(
      [
        //NameAndAgeRendererComponent,
        HeaderComponent,
        HeaderGroupComponent
      ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
