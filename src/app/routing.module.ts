import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFormComponent } from './report-form/report-form.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReportListMapComponent } from './report-list-map/report-list-map.component';
import { ReportContainerComponent } from './report-container/report-container.component';
import { MoreInfoComponent } from './more-info/more-info.component';

const routes:Routes  =[
 {path:'', component: ReportContainerComponent},
 {path: 'more-info/:id', component: MoreInfoComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
