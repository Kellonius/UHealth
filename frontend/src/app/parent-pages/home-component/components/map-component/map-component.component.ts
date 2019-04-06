import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { latitudeLongitude } from 'src/app/Models/location';
import { LocationService } from 'src/app/Services/location.service';
import { FacilityService } from 'src/app/Services/facility.service';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(AgmMap)
  public agmMap: AgmMap
  map:any;
  zoom: number = 8;

  location: latitudeLongitude = {
    Latitude: 0,
    Longitude: 0
  };

  constructor(public locationService: LocationService, public facilityService: FacilityService) { }

  ngOnInit() {
    this.locationService.createMarkers(this.facilityService.facilities);
  }

  protected mapReady(map) {
    this.map = map;
  }

  mapClicked($event: any) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true,
    //   info: ''
    // });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  getMarkers() {
    return this.locationService.markers;
  }

  getLatitude() {
    return this.locationService.lat;
  }

  getLongitude() {
    return this.locationService.lng;
  }

}
