import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Report } from './report.model';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ReportService {
  locations: String[]= [];
  private apiUrl = 'https://272.selfip.net/apps/vI6qmSULGM/collections/Reports/documents/';
  @Output() aClickedEvent=   new EventEmitter<string>();
  @Output() locationDeleted = new EventEmitter<String>();

  deleteLocation(msg: string){
    this.locationDeleted.emit(msg);
  }

  AClicked(msg: string){
    this.aClickedEvent.emit(msg);
  }
  constructor(private http: HttpClient, private router: Router) { 
  }

  get(): Observable<any[]>{
    console.log("inside get function (report service)");
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((data)=>console.log("API repsonse:", data))
    );
    
  }

  getID(id:string){
    console.log(id);
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



  add(r:Report): Observable<any>{
    console.log(r.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }

    const data = { 
      key: r.id, 
      data:r
    }

    console.log("in method add",r);
    return this.http.post<typeof data>(this.apiUrl, data, httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  delete(id: string): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  getLocations(): Observable<string[]> {
    return this.get().pipe(
      map((reports) => {
        const uniqueLocations: string[] = [];
        reports.forEach((report:any) => {
          if (!uniqueLocations.includes(report.data.location)) {
            uniqueLocations.push(report.data.location);
          }
        });
        // console.log(uniqueLocations);
        return uniqueLocations;
      })
    );
  }

  reportUpdated(r:any){
    r.data.status = true;
    const updateUrl = `${this.apiUrl}/${r.key}`;
    this.http.put<any>(updateUrl, r).subscribe((response)=>{
      console.log('API response: ',response)
    });
  }
}
