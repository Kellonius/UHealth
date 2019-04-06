import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility.service';
import { Facility } from 'src/app/Models/facility';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-facility-list-component',
  templateUrl: './facility-list-component.component.html',
  styleUrls: ['./facility-list-component.component.scss']
})
export class FacilityListComponentComponent implements OnInit {

  constructor(public facilityService: FacilityService, public sharedService: SharedService) { }

  ngOnInit() {
  }

  getFacilities() {
    return this.facilityService.facilities;
  }

  selectFacility(facility: Facility, index: number) {
    this.facilityService.selectFacility(facility, index);
  }

  getSelectCount() {
    if (this.facilityService.selectedCount() > 1) {
      return false;
    } else {
      return true;
    }
  }


}
