import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facility } from 'src/app/Models/facility';
import { FacilityService } from 'src/app/Services/facility.service';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { ProcedureStatistics } from 'src/app/Models/procedure-statistics';
import { PhysiciansService } from 'src/app/Services/physician.service';

@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrls: ['./details-component.component.scss']
})
export class DetailsComponent implements OnInit {

  facility: Facility;
  statistics: ProcedureStatistics[]
  routeParams: any;
  showError: boolean = false;
  tableHeaders = ["Description", "Average Cost", "Average Length Of Stay", "Mortality Rate", "Major Complications Rate", "Minor Complications Rate", "Readmission Rate"];
  physicianHeaders = ["Name", "Specialty", "NPI"]

  constructor(private activatedRoute: ActivatedRoute, private facilityService: FacilityService, private procedureStatisticsService: ProcedureStatisticsService, private physicianService: PhysiciansService) {
    this.routeParams = this.activatedRoute.snapshot.params;
    this.getFacility(+this.routeParams.FacilitySkey);
  }

  ngOnInit() {
  }

  getFacility(Skey: number) {
    this.facilityService.facilities.forEach(x => {
      if (x.FacilityKey === Skey) {
        this.facility = x;
      }
    })
    if (!this.facility || this.facility === null) {
      this.showError = true;
    }
  }

  getProcedureStatistics() {
    return this.procedureStatisticsService.statistics.sort((a, b) => (a.ProcedureDescr.length > b.ProcedureDescr.length) ? 1 : ((b.ProcedureDescr.length > a.ProcedureDescr.length) ? -1 : 0));
  }

  getPhysicians() {
    return this.physicianService.physicians.sort((a, b) => (a.LastName.length > b.LastName.length) ? 1 : ((b.LastName.length > a.LastName.length) ? -1 : 0));
  }
}
