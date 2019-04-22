import { Component, OnInit } from '@angular/core';
import { FacilityTypesService } from 'src/app/Services/facility-types.service';
import { InsuranceService } from 'src/app/Services/insurance.service';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { PhysiciansService } from 'src/app/Services/physician.service';
import { FacilityService } from 'src/app/Services/facility.service';
import { ApplicationService } from 'src/app/Services/app-service';
import { FacilityTypes } from 'src/app/Models/facility-types';
import { Insurance } from 'src/app/Models/insurance';
import { Procedure } from 'src/app/Models/procedure';
import { Specialty } from 'src/app/Models/specialty';
import { LocationService } from 'src/app/Services/location.service';
import { FilterService } from 'src/app/Services/filter-services';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent implements OnInit {

  facilityTypeSelectModel: FacilityTypes;
  insuranceSelectModel: Insurance;
  procedureSelectModel: Procedure;
  specialtySelectModel: Specialty;

  constructor(private facilityTypesService: FacilityTypesService, private insuranceService: InsuranceService, private procedureService: ProcedureStatisticsService,
    private physicianService: PhysiciansService, private facilityService: FacilityService, private locationService: LocationService, private filterService: FilterService) { }

  ngOnInit() {
  }

  getFacilityTypes() {
    return this.facilityTypesService.facilityTypesListFiltered;
  }

  getInsuranceTypes() {
    return this.insuranceService.insuranceTypesListFiltered;
  }

  getProcedureTypes() {
    return this.procedureService.procedureTypesListFiltered;
  }

  getSpecialtyTypes() {
    return this.physicianService.specialtyTypeListFiltered;
  }

  filterMap() {
    this.facilityService.filterMap(this.facilityTypeSelectModel, this.insuranceSelectModel, this.procedureSelectModel, this.specialtySelectModel, this.locationService.zipCode);
  }

  clearFilters() {
    this.locationService.clearMarkers();
    this.facilityTypeSelectModel = new FacilityTypes;
    this.insuranceSelectModel = new Insurance;
    this.procedureSelectModel = new Procedure;
    this.specialtySelectModel = new Specialty;
    this.facilityService.getFacilitiesByZip(this.locationService.zipCode);
    this.facilityTypesService.getFacilityTypesByZip(this.locationService.zipCode);
    this.insuranceService.getInsuranceTypesByZip(this.locationService.zipCode);
    this.procedureService.getProcedureTypesByZip(this.locationService.zipCode);
    this.physicianService.getSpecialtyTypesByZip(this.locationService.zipCode);
  }
}
