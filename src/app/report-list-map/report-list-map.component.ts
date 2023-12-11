import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReportService } from '../report.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
@Component({
  selector: 'app-report-list-map',
  templateUrl: './report-list-map.component.html',
  styleUrls: ['./report-list-map.component.css']
})

export class ReportListMapComponent implements OnInit{
  private map!: L.Map;
  reports: any[]=[];
  markerMap = new Map<string, {marker:L.Marker, number:number}>();
  constructor(private rs:ReportService, private http:HttpClient){

  }
  ngOnInit(): void {
    this.showMap();
    this.onMapClick();
    this.putLabels();

    this.rs.locationDeleted.subscribe((data: string)=>{ //data: string location to delete label from map
      this.modifyLabel(data);
    })
  }

  modifyLabel(data:string){
    const marker = this.markerMap.get(data);
    if(marker){
      console.log("inside modify label map");
      marker.number = marker.number-1;
      if(marker.number >0){
        const number = marker.number;
        marker.marker.bindPopup(`This location has ${number} nuisance`).openPopup();
        this.markerMap.set(data, marker);
      }
      else if(marker.number == 0){
        marker.marker.removeFrom(this.map);
        this.markerMap.delete(data);
      }
    }
  }
  onReportDelete(evt:any){
    // const delete_report = evt['id'];
  }
  
  showMap() {
    this.map = L.map('mapid').setView([49.27188504662064, -123.03679351828312], 12);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  putLabels() {
    console.log("inside putLabels functions");
    this.rs.get().subscribe((reports)=>{
      reports.forEach((r)=>{
        this.reports.push(r);
      });

      console.log(this.reports);
      this.reports.forEach((r)=>{
        console.log(r.data.location);
        if(this.markerMap.has(r.data.location)){
          const markerData = this.markerMap.get(r.data.location);
          console.log("hey in markerData");
          console.log(markerData);
          if(markerData){
            markerData.number+=1;
            const number = markerData.number;
            console.log("hey in markerData");
            console.log(markerData.number);
            markerData.marker.bindPopup(`This location has ${number} nuisance`).openPopup();
            this.markerMap.set(r.key, markerData);
          }
        } else{
          const matches = r.data.location.match(/([-+]?\d+\.\d+),\s([-+]?\d+\.\d+)/);
          if (matches && matches.length === 3) {
          const lat = parseFloat(matches[1]);
          const lng = parseFloat(matches[2]);
          
          const marker = L.marker([lat, lng]).addTo(this.map);
          
          marker.on('click',(e:L.LeafletMouseEvent)=>{
            const clickedLocation = e.latlng.toString();
            this.rs.AClicked(clickedLocation);

          })
          const number = 1;
          marker.bindPopup(`This location has ${number} nuisance`).openPopup();
          this.markerMap.set(r.data.location, {marker, number});
        }
        }
      })
    })
  }

  onMapClick(){
      this.map.on('click', (e: L.LeafletMouseEvent) =>{
      const clickedLocation = e.latlng.toString();
      this.rs.AClicked(clickedLocation);
      console.log(e.latlng);
    });
  }
}
