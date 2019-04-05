import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { latitudeLongitude } from 'src/app/Models/location';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit {
  @ViewChild(AgmMap)
  public agmMap: AgmMap
  map:any;
  zoom: number = 8;
  
  lat: number = 51.673858;
  lng: number = 7.815982;

  location: latitudeLongitude = {
    Latitude: 0,
    Longitude: 0
  };

  markers: marker[] = []

  constructor() { }

  ngOnInit() {
  }

  protected mapReady(map) {
    this.map = map;
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      info: ''
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}
