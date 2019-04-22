import { FacilityDetails } from '../Models/facility-details';
import { FacilityTypesFilter } from '../Models/Filter Models/facility-types-filter';
import { ApplicationService } from './app-service';
import { FacilityService } from './facility.service';
import { Injectable } from '@angular/core';
import { Facility } from '../Models/facility';

@Injectable()
export class FilterService {

    FacilityTypesList: FacilityTypesFilter[] = []
    FacilityTypesListFiltered: FacilityTypesFilter[] = []

    constructor(public appService: ApplicationService) {

    }

    getFilters(facilities: Facility[]) {
        facilities.forEach(x => {
            this.appService.getFacilityTypesForFilter(x.FacilityKey).subscribe(y => {
                this.FacilityTypesList.push(y);
                this.FacilityTypesListFiltered = this.FacilityTypesList;
            });
        })
    }
}