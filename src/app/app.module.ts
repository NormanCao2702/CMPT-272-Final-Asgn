import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportListMapComponent } from './report-list-map/report-list-map.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportListComponent,
    ReportFormComponent,
    ReportListMapComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
