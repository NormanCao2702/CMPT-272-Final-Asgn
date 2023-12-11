import { Component, EventEmitter, Input,Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})

export class ReportListComponent{
  showReportForm: boolean = false;
  nameSortDirection: 'asc' | 'desc' = 'asc';
  locationSortDirection: 'asc' | 'desc' = 'asc';
  timeSortDirection: 'asc' | 'desc' = 'asc';
  @Input() reports: any[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() location = new EventEmitter<string>();

  constructor(
    private router:Router,
    private dialogRef: MatDialog,
    private http: HttpClient,
    private rs: ReportService
  ){
  }
  
  deleteReport(id: string, location: string){
    let password = prompt('Enter password for further operations:');

    this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value=' + password).subscribe((data: any) => {
      password = data.Digest;
      console.log(password);
      if (password === 'fcab0453879a2b2281bc5073e3f5fe54') {
        this.rs.delete(id).subscribe(() => {
          this.delete.emit(id);
          window.location.reload();
        });
        this.rs.deleteLocation(location);
      } else if(password == null) {
        alert('Invalid password');
      }
    });
  }

  sortDate() {
    this.timeSortDirection = this.timeSortDirection === 'asc' ? 'desc' : 'asc';
    this.reports.sort((a, b) => {
      const order = this.timeSortDirection === 'asc' ? 1 : -1;
      return order * a.data.date.localeCompare(b.data.date);
    });
  }

  sortName() {
    this.nameSortDirection = this.nameSortDirection === 'asc' ? 'desc' : 'asc';
    this.reports.sort((a, b) => {
      const order = this.nameSortDirection === 'asc' ? 1 : -1;
      return order * a.data.monsterInfo.localeCompare(b.data.monsterInfo);
    });
  }

  sortLocation() {
    this.locationSortDirection = this.locationSortDirection === 'asc' ? 'desc' : 'asc';
    this.reports.sort((a, b) => {
      const order = this.locationSortDirection === 'asc' ? 1 : -1;
      return order * a.data.location.localeCompare(b.data.location);
    });
  }

  moreInfo(r: any): void {
    console.log("inside moreInfo method in report list");
    console.log(r);
    this.router.navigate(['more-info',r.key]);
    }

  toggleReportForm() {
    this.showReportForm = !this.showReportForm;
  }
}
