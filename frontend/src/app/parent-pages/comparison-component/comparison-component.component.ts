import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility.service';
import { Facility } from 'src/app/Models/facility';
import { ProcedureStatistics, ProcedureStatisticsArray, ProcedureCompare } from 'src/app/Models/procedure-statistics';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { ApplicationService } from 'src/app/Services/app-service';
import { BreadCrumbService } from 'src/app/Services/breadcrumb.service';
import { FacilityDetails } from 'src/app/Models/facility-details';
import { Insurance } from 'src/app/Models/insurance';
import { Specialty } from 'src/app/Models/specialty';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-comparison-component',
  templateUrl: './comparison-component.component.html',
  styleUrls: ['./comparison-component.component.scss']
})
export class ComparisonComponent implements OnInit {

  facilities: Facility[] = [];
  selectedForComparison: Facility[] = [];
  facilityDetails: ProcedureStatistics[];
  specialtyDetails: Specialty[] = new Array<Specialty>()
  procStats: ProcedureStatisticsArray = new ProcedureStatisticsArray();
  allFacilityDetails: ProcedureStatistics[] = new Array<ProcedureStatistics>();
  comparisonTypes = ["Insurance", "Procedure", "Specialty"];
  procedures: string[] = [];
  insurances: string[] = [];
  specialties: string[] = [];
  showProceduresFilter: boolean = false;
  showInsuranceFilter: boolean = false;
  showSpecialtyFilter: boolean = false;
  procedureCompare: ProcedureCompare[] = [];
  insurance: Insurance[] = new Array<Insurance>();

  constructor(private facilityService: FacilityService, private procedureService: ProcedureStatisticsService, private appService: ApplicationService,
    private breadcrumbService: BreadCrumbService) {
    this.facilities = this.facilityService.selectedFacilities;
    this.breadcrumbService.breadcrumbs.push("Facility Comparison")
  }

  ngOnInit() {

  }

  onClick(facility: Facility) {
    if (!this.selectedForComparison.includes(facility)) {
      facility.Selected = true;
      this.selectedForComparison.push(facility);
      this.appService.getProcedureStatisticsByKey(facility.FacilityKey).subscribe(y => {
        this.facilityDetails = [];
        this.facilityDetails = y.sort((a, b) => (a.ProcedureDescr > b.ProcedureDescr) ? 1 : ((b.ProcedureDescr > a.ProcedureDescr) ? -1 : 0));
        this.facilityDetails.forEach(z => this.allFacilityDetails.push(z))

        y.forEach(z => {
          if (!this.procedures.includes(z.ProcedureDescr)) {
            this.procedures.push(z.ProcedureDescr);
          }
        })
      })

      this.appService.getInsuranceByKey(facility.FacilityKey).subscribe(y => {
        y.forEach(z => {
          let ins = new Insurance();
          ins.facilityKey = facility.FacilityKey;
          ins.InsuranceName = z.InsuranceName;
          ins.InsuranceSKey = z.InsuranceSKey;
          ins.InsuranceType = z.InsuranceType;
          this.insurance.push(ins);
          this.insurances.push(z.InsuranceName);
          this.insurance = this.insurance.sort((a, b) => (a.InsuranceName > b.InsuranceName) ? 1 : ((b.InsuranceName > a.InsuranceName) ? -1 : 0));
          this.insurances = this.insurances.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        })
      })

      this.appService.getSpecialtiesByKey(facility.FacilityKey).subscribe(y => {
        y.forEach(z => {
          let spec = new Specialty();
          spec.FacilityKey = facility.FacilityKey;
          spec.SpecialtySKey = z.SpecialtySKey;
          spec.Description = z.Description;
          this.specialtyDetails.push(spec);
          this.specialties.push(z.Description);
        })
      })

      // this.procedureChart(this.selectedForComparison)
    } else {

      const index = this.selectedForComparison.indexOf(facility, 0);
      if (index > -1) {
        this.selectedForComparison.splice(index, 1);
      }

      this.allFacilityDetails = this.allFacilityDetails.filter(fd => fd.FacilitySKey !== facility.FacilityKey);
    }
  }

  showInstructions() {
    if (this.selectedForComparison.length < 1) {
      return true;
    } else if (this.showInsuranceFilter === true) {
      return false;
    } else if (this.showProceduresFilter === true) {
      return false;
    } else if (this.showSpecialtyFilter === true) {
      return false;
    }
  }

  selectType(type: string) {
    if (type.toLowerCase() === "procedure") {
      this.showProceduresFilter = !this.showProceduresFilter;
    } else if (type.toLowerCase() === "insurance") {
      this.showInsuranceFilter = !this.showInsuranceFilter;
    } else if (type.toLowerCase() === "specialty") {
      this.showSpecialtyFilter = !this.showSpecialtyFilter;
    }
  }

  compare(type: string, facility: Facility, index: number) {
    if (index === 0) {
      const found = this.allFacilityDetails.some(x => x.ProcedureDescr.toLowerCase() === type.toLowerCase() && x.FacilitySKey === facility.FacilityKey);
      let value: string = '';
      if (found === false) {
        value = 'N/A';
      } else {
        this.allFacilityDetails.forEach(y => {
          if (y.ProcedureDescr.toLowerCase() === type.toLowerCase() && y.FacilitySKey === facility.FacilityKey) {
            value = y.AvgTotalCost.toString();
          }
        })
      }
      return value;
    } else if (index === 1) {
      const found = this.allFacilityDetails.some(x => x.ProcedureDescr.toLowerCase() === type.toLowerCase() && x.FacilitySKey === facility.FacilityKey);
      let value: string = '';
      if (found === false) {
        value = 'N/A';
      } else {
        this.allFacilityDetails.forEach(y => {
          if (y.ProcedureDescr.toLowerCase() === type.toLowerCase() && y.FacilitySKey === facility.FacilityKey) {
            value = y.AvgLos.toString();
          }
        })
      }
      return value;
    }
    else if (index === 2) {
      const found = this.insurance.some(x => x.InsuranceName.toLowerCase() === type.toLowerCase() && x.facilityKey === facility.FacilityKey);
      let value: string = ''
      if (found === false) {
        value = '';
      } else {
        this.insurance.forEach(y => {
          if (y.InsuranceName.toLowerCase() === type.toLowerCase() && y.facilityKey === facility.FacilityKey) {
            value = "X"
          }
        })
      }
      return value;
    }
    else if (index === 3) {
      const found = this.specialtyDetails.some(x => x.Description.toLowerCase() === type.toLowerCase() && x.FacilityKey === facility.FacilityKey);
      let value: string = ''
      if (found === false) {
        value = '';
      } else {
        this.specialtyDetails.forEach(y => {
          if (y.Description.toLowerCase() === type.toLowerCase() && y.FacilityKey === facility.FacilityKey) {
            value = "X"
          }
        })
      }
      return value;
    }
  }

  // procedureChart(facilities: Facility[]) {
  //   var ctx = document.getElementById('procedureBar');

  //   var myBarChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //         labels: this.procedures,
  //         datasets: [{
  //             label: '',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero: true
  //                 }
  //             }]
  //         }
  //     }
  // });
  // }
}
