import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})


export class ReportFormComponent implements OnInit {
  form: FormGroup;
  report: any[]=[];

  constructor(
    // private rs: ReportSerivce,
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
        Validators.minLength(4),
      ]),
      WitnessInfo: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
      ]),
      extra: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ]),
    }

    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    
  }

  onSubmit(values: any){

  }
}
