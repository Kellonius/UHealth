import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facility } from 'src/app/Models/facility';
import { FacilityService } from 'src/app/Services/facility.service';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { ProcedureStatistics } from 'src/app/Models/procedure-statistics';
import { PhysiciansService } from 'src/app/Services/physician.service';
import { ApplicationService } from 'src/app/Services/app-service';
import { BreadCrumbService } from 'src/app/Services/breadcrumb.service';

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
  isLoading: boolean = true;
  tableHeaders = ["Description", "Average Cost", "Average Length Of Stay", "Mortality Rate", "Major Complications Rate", "Minor Complications Rate", "Readmission Rate"];
  physicianHeaders = ["Name", "Specialty", "NPI"]

  constructor(private activatedRoute: ActivatedRoute, private facilityService: FacilityService, private procedureStatisticsService: ProcedureStatisticsService,
    private physicianService: PhysiciansService, private appService: ApplicationService, private breadcrumbService: BreadCrumbService) {
    this.routeParams = this.activatedRoute.snapshot.params;
    this.getFacility(+this.routeParams.FacilitySkey);
    this.procedureStatisticsService.getProcedureStatisticsByKey(+this.routeParams.FacilitySkey);
    this.physicianService.getPhysiciansByKey(+this.routeParams.FacilitySkey);
    }

  ngOnInit() {
  }

  getFacility(Skey: number) {
    this.appService.getFacilityByKey(+this.routeParams.FacilitySkey).subscribe(x => {
      this.facility = x
      if (!this.facility || this.facility === null) {
        this.showError = true;
      } else {
        this.isLoading = false;
        this.breadcrumbService.breadcrumbs.push(this.facility.FacilityName);
      }
    });
  }

  getProcedureStatistics() {
    return this.procedureStatisticsService.statistics.sort((a, b) => (a.ProcedureDescr > b.ProcedureDescr) ? 1 : ((b.ProcedureDescr > a.ProcedureDescr) ? -1 : 0));
  }

  getPhysicians() {
    return this.physicianService.physicians.sort((a, b) => (a.LastName > b.LastName) ? 1 : ((b.LastName > a.LastName) ? -1 : 0));
  }
}
