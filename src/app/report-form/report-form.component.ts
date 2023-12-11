import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { ReportService } from '../report.service';
import { Report } from '../report.model';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})


export class ReportFormComponent implements OnInit {
  // name: string = '';
  printForm() {
    console.log(this.form);
  }
  form: FormGroup;
  locations: string[] = [];
  constructor(
    private rs: ReportService,
    private router: Router,
    private http: HttpClient
  ){
    let formControls = {
      MonsterName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),

      status: new FormControl(false),

      WitnessInfo: new FormControl('',[
        Validators.required,
        Validators.minLength(4),
      ]),
      extra: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ]),
    }

    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    this.rs.getLocations().subscribe((locations) => {
      this.locations = locations;
      console.log(locations);
    });

    this.rs.aClickedEvent.subscribe((data:string)=>{
      this.form.get('location')?.setValue(data);
    })
  }

  onSubmit(){
    const newReport: Report = {
      monsterInfo: this.form.get('MonsterName')!.value,
      location: this.form.get('location')!.value,
      witnessInfo: this.form.get('WitnessInfo')!.value,
      extra: this.form.get('extra')!.value,
      date: new Date(),
      status: false,
      id: generateRandomKey(9),
    }
    console.log(newReport);
    this.rs.add(newReport).subscribe(()=>{
      window.location.reload();
    });
  }
}

function generateRandomKey(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
