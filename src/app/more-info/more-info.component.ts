import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit{
  report!: any;
  selectedStatus!: string;

  constructor(
    private router: ActivatedRoute,
    private rs: ReportService,
    private http: HttpClient,
    private route:Router,
  ){
    
  }
  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.rs.getID(params['id']).subscribe((report)=>{
        this.report = report;
        console.log(this.report);
      })
    })
  }

  updateStatus(): void{
    let password = prompt('Enter password for further operations:');

    this.http.get<Object>('https://api.hashify.net/hash/md5/hex?value=' + password).subscribe((data: any) => {
      password = data.Digest;
      console.log(password);
      if (password === 'fcab0453879a2b2281bc5073e3f5fe54') {
        this.report.data.status = true;
        this.rs.reportUpdated(this.report);
      } else {
        alert('Invalid password');
      }
    });
    
  }

  back(): void{
    this.route.navigate(['']);
  }
}
