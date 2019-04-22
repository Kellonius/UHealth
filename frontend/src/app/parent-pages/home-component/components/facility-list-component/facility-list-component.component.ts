import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility.service';
import { Facility } from 'src/app/Models/facility';
import { SharedService } from 'src/app/Services/shared.service';
import { Router } from '@angular/router';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog-component/dialog-component.component';

@Component({
  selector: 'app-facility-list-component',
  templateUrl: './facility-list-component.component.html',
  styleUrls: ['./facility-list-component.component.scss']
})
export class FacilityListComponentComponent implements OnInit {

  constructor(public facilityService: FacilityService, public sharedService: SharedService, private router: Router, public dialog: MatDialog) { }

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

  navigateComparison() {
    this.router.navigate(["/compare"])
  }

  truncate(name: string){
    if (name.length > 23) {
      return name.slice(0, 23) + '...'
    } else{
      return name;
    }
  }

  openDialog(facility: Facility): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '750px',
      width: '750px',
      data: {facility: facility}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getFacilityCount() {
    return this.facilityService.facilities.length;
  }
}
