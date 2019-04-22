import { Injectable } from '@angular/core';
import { Physician } from '../Models/physician';
import { Specialty } from '../Models/specialty';
import { ApplicationService } from './app-service';

@Injectable()
export class PhysiciansService {

    specialtyTypeList: Specialty[] = [];
    specialtyTypeListFiltered: Specialty[] = [];
    physicians: Physician[] = []


    constructor(private appService: ApplicationService) {

    }
    clearTypes() {
        this.specialtyTypeListFiltered = [];
    }

    clearTypesForFilter(specialty: Specialty) {
        this.specialtyTypeListFiltered = [];
        if (specialty ) {
            this.specialtyTypeListFiltered.push(specialty)
        }
    }

    getPhysiciansByKey(key: number) {
        this.appService.getPhysiciansByKey(key).subscribe(x => this.physicians = x)
    }

    getSpecialtyTypes() {
        this.appService.getSpecialtyTypes().subscribe(x => this.specialtyTypeList = x);
    }

    getSpecialtyTypesByZip(zip: string) {
        this.appService.getSpecialtiesByZipCode(zip).subscribe(x => this.specialtyTypeListFiltered = x);
    }

    getSpecialyTypesByKey(key: number) {
        this.appService.getSpecialtiesByKey(key).subscribe(x => {
            x.forEach(y => {
                if (this.specialtyTypeListFiltered && this.specialtyTypeListFiltered.length > 0) {
                    this.specialtyTypeListFiltered.forEach(z => {
                        if (z.SpecialtySKey !== y.SpecialtySKey) {
                            this.specialtyTypeListFiltered.push(y);
                        }
                    })
                }
            });
        })
    }

    getSpecialtyTypesForFilter(specialties: Specialty[]) {
        specialties.forEach(x => {
            this.specialtyTypeList.forEach(y => {
                if (x.SpecialtySKey === y.SpecialtySKey) {
                    let s: Specialty = y;
                    if (!this.specialtyTypeList.includes(s)) {
                        this.specialtyTypeListFiltered.push(y);
                    }
                };
            });
        });
    }
}