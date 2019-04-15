import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility.service';
import { LocationService } from 'src/app/Services/location.service';

@Component({
  selector: 'app-zipcode-component',
  templateUrl: './zipcode-component.component.html',
  styleUrls: ['./zipcode-component.component.scss']
})
export class ZipcodeComponentComponent implements OnInit {

  zipCode: string;

  constructor(private facilityService: FacilityService, private locationService: LocationService) { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.zipCode = event.target.value;
  }

  getFacilities() {
    this.locationService.clearMarkers();
    this.facilityService.getFacilitiesByZip(this.zipCode);
      
  }

}
