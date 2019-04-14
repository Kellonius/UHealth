import { Component, OnInit } from '@angular/core';
import { FacilityTypesService } from 'src/app/Services/facility-types.service';
import { InsuranceService } from 'src/app/Services/insurance.service';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { PhysiciansService } from 'src/app/Services/physician.service';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.scss']
})
export class FilterComponentComponent implements OnInit {

  facilityTypeSelectModel: string;
  insuranceSelectModel: string;
  procedureSelectModel: string;
  specialtySelectModel: string;

  constructor(private facilityTypesService: FacilityTypesService, private insuranceService: InsuranceService, private procedureService: ProcedureStatisticsService,
    private physicianService: PhysiciansService) { }

  ngOnInit() {
  }

  getFacilityTypes() {
    return this.facilityTypesService.facilityTypesList;
  }

  getInsuranceTypes() {
    return this.insuranceService.insuranceTypesList;
  }

  getProcedureTypes() {
    return this.procedureService.procedureTypesList;
  }

  getSpecialtyTypes() {
    return this.physicianService.specialtyTypeList;
  }
}
