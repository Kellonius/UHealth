import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility.service';
import { Facility } from 'src/app/Models/facility';

@Component({
  selector: 'app-comparison-component',
  templateUrl: './comparison-component.component.html',
  styleUrls: ['./comparison-component.component.scss']
})
export class ComparisonComponent implements OnInit {

  facilities: Facility[] = []
  comparisonTypes = ["Insurance", "Procedure", "Specialty"]
  insuranceTypes = ["USA GEHA", "Cigna", "Rocky Mountain"]
  
  constructor(private facilityService: FacilityService) { 
    this.facilities = this.facilityService.selectedFacilities;
  }

  ngOnInit() {
  }

}
