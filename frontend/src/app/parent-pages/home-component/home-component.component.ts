import { Component, OnInit } from '@angular/core';
import { FacilityTypesService } from 'src/app/Services/facility-types.service';
import { InsuranceService } from 'src/app/Services/insurance.service';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { PhysiciansService } from 'src/app/Services/physician.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private facilityTypesService: FacilityTypesService, private insuranceService: InsuranceService, private procedureService: ProcedureStatisticsService,
    private physicianService: PhysiciansService) { }

  ngOnInit() {
    this.facilityTypesService.getFacilityTypes();
    this.insuranceService.getInsuranceTypes();
    this.procedureService.getProcedureTypes();
    this.physicianService.getSpecialtyTypes();
  }

}