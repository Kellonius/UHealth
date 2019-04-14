import { FacilityTypes } from '../Models/facility-types';
import { ApplicationService } from './app-service';
import { Injectable } from '@angular/core';

@Injectable()
export class FacilityTypesService {

    public facilityTypesList: FacilityTypes[] = []

    constructor(private appService: ApplicationService) {

    }

    getFacilityTypes() {
        this.appService.getFacilityTypes().subscribe(x => this.facilityTypesList = x);
    }
}