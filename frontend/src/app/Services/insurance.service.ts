import { Insurance } from '../Models/insurance';
import { ApplicationService } from './app-service';
import { Injectable } from '@angular/core';

@Injectable()
export class InsuranceService {

    public insuranceTypesList: Insurance[] = []
    public insuranceTypesListFiltered: Insurance[] = []

    constructor(private appService: ApplicationService) {

    }

    clearTypes() {
        this.insuranceTypesListFiltered = [];
    }

    clearTypesForFilter(insurance: Insurance) {
        this.insuranceTypesListFiltered = [];
        if (insurance) {
            this.insuranceTypesListFiltered.push(insurance);
        }
    }

    getInsuranceTypes() {
        this.appService.getInsuranceTypes().subscribe(x => this.insuranceTypesList = x);
    }

    getInsuranceTypesByZip(zip: string) {
        this.appService.getInsuranceByZipCode(zip).subscribe(x => this.insuranceTypesListFiltered = x);
    }

    getInsuranceTypesByKey(key: number) {
        this.appService.getInsuranceByKey(key).subscribe(x => {
            x.forEach(y => {
                this.insuranceTypesListFiltered.push(y);
            })
        });
    }

    getInsuranceTypesForFilter(insurance: Insurance[]) {
        insurance.forEach(x => {
            this.insuranceTypesList.forEach(y => {
                if (x.InsuranceSKey === y.InsuranceSKey) {
                    let ins: Insurance = y;
                    if (!this.insuranceTypesListFiltered.includes(ins)) {
                        this.insuranceTypesListFiltered.push(y);
                    }
                };
            });
        });
    }
}