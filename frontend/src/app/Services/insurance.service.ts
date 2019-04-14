import { Insurance } from '../Models/insurance';
import { ApplicationService } from './app-service';
import { Injectable } from '@angular/core';

@Injectable()
export class InsuranceService {

    public insuranceTypesList: Insurance[] = []

    constructor(private appService: ApplicationService) {

    }

    getInsuranceTypes() {
        this.appService.getInsuranceTypes().subscribe(x => this.insuranceTypesList = x);
    }
}