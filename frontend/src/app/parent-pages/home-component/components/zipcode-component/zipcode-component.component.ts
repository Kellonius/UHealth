import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility.service';
import { LocationService } from 'src/app/Services/location.service';
import { InsuranceService } from 'src/app/Services/insurance.service';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { PhysiciansService } from 'src/app/Services/physician.service';
import { FacilityTypesService } from 'src/app/Services/facility-types.service';
import { FilterService } from 'src/app/Services/filter-services';

@Component({
  selector: 'app-zipcode-component',
  templateUrl: './zipcode-component.component.html',
  styleUrls: ['./zipcode-component.component.scss']
})
export class ZipcodeComponentComponent implements OnInit {

  zipCode: string;

  constructor(private facilityService: FacilityService, private locationService: LocationService, private insuranceService: InsuranceService, 
    private procedureService: ProcedureStatisticsService, public physicianService: PhysiciansService, public facilityTypeService: FacilityTypesService, public filterService: FilterService) { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.zipCode = event.target.value;
  }

  getFacilities() {
    this.locationService.clearMarkers();
    this.facilityService.getFacilitiesByZip(this.zipCode);
    this.facilityTypeService.getFacilityTypesByZip(this.zipCode);
    this.insuranceService.getInsuranceTypesByZip(this.zipCode);
    this.procedureService.getProcedureTypesByZip(this.zipCode)
    this.physicianService.getSpecialtyTypesByZip(this.zipCode)
    this.locationService.setZipCode(this.zipCode);
  }

}
