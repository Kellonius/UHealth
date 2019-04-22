import { FacilityTypes } from '../Models/facility-types';
import { ApplicationService } from './app-service';
import { Injectable } from '@angular/core';
import { Facility } from '../Models/facility';

@Injectable()
export class FacilityTypesService {

    public facilityTypesList: FacilityTypes[] = []
    public facilityTypesListFiltered: FacilityTypes[] = []

    constructor(private appService: ApplicationService) {

    }

    clearTypes() {
        this.facilityTypesListFiltered = [];
    }

    clearTypesForFilter(facilityType: FacilityTypes) {
        this.facilityTypesListFiltered = [];
        if (facilityType) {
            this.facilityTypesListFiltered.push(facilityType);
        }
    }

    getFacilityTypes() {
        this.appService.getFacilityTypes().subscribe(x => this.facilityTypesList = x);
    }

    getFacilityTypesByZip(zip: string) {
        this.appService.getFacilityTypesByZipCode(zip).subscribe(x => this.facilityTypesListFiltered = x);
    }

    getFacilityTypesByKey(key: number) {
        this.appService.getFacilityTypesByKey(key).subscribe(x => {
            x.forEach(y => {
                if (this.facilityTypesListFiltered && this.facilityTypesListFiltered.length > 0) {
                    this.facilityTypesListFiltered.forEach(z => {
                        if (z.FacilityTypeKey !== y.FacilityTypeKey) {
                            this.facilityTypesListFiltered.push(y);
                        }
                    })
                } else {
                    this.facilityTypesListFiltered.push(y);
                }
            });
        });
    }

    getFacilityTypesForFilter(facilities: Facility[]) {
        this.facilityTypesListFiltered = [];
        facilities.forEach(x => {
            this.facilityTypesList.forEach(y => {
                if (x.TypeSkey === y.FacilityTypeKey) {
                    let ft: FacilityTypes = y;
                    if (!this.facilityTypesListFiltered.includes(ft)) {
                        this.facilityTypesListFiltered.push(y);
                    }
                };
            });
        });
    }
}