import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Report } from '../report.model';
@Component({
  selector: 'app-report-container',
  templateUrl: './report-container.component.html',
  styleUrls: ['./report-container.component.css']
})
export class ReportContainerComponent implements OnInit{
  reports: any[]=[];

  constructor(private rs: ReportService){}

  ngOnInit(): void {
    this.rs.get().subscribe((report)=>{
      console.log("inside getting data in report container");
      this.reports = report;
      // console.log(this.reports[0].data.monsterInfo);
    });
  }

  onDeleteReport(id: string){
    this.rs.delete(id).subscribe(()=>{
      this.reports = this.reports.filter((report)=> report.id !== id);
    })
  }
}
