import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Facility } from 'src/app/Models/facility';
import { PhysiciansService } from 'src/app/Services/physician.service';
import { ProcedureStatisticsService } from 'src/app/Services/procedure-statistics.service';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Facility, public physicianService: PhysiciansService,
  private procedureService: ProcedureStatisticsService) {

  }


  ngOnInit() {
    this.physicianService.getPhysiciansByKey(this.data['facility'].FacilityKey);
    this.procedureService.getProcedureTypesByKey(this.data['facility'].FacilityKey);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getPhysicians() {
    return this.physicianService.physicians.sort((a, b) => (a.LastName > b.LastName) ? 1 : ((b.LastName > a.LastName) ? -1 : 0));
  }

  getProcedures() {
    return this.procedureService.procedureTypesListFiltered.sort((a, b) => (a.Description > b.Description) ? 1 : ((b.Description > a.Description) ? -1 : 0));
  }

}
