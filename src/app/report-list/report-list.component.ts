import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})

export class ReportListComponent {
  @Input() report:any;
  @Output() delete = new EventEmitter();

  constructor(
    private router:Router,
    private dialogRef: MatDialog,
    private http: HttpClient
  ){

  }
  
onDelete($event: MouseEvent,arg1: any) {
throw new Error('Method not implemented.');
}
openDialog($event: MouseEvent,arg1: any) {
throw new Error('Method not implemented.');
}
sortDate() {
throw new Error('Method not implemented.');
}
sortName() {
throw new Error('Method not implemented.');
}
sortLocation() {
throw new Error('Method not implemented.');
}

}
