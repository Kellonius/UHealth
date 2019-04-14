import { Injectable } from '@angular/core';
import { Physician } from '../Models/physician';
import { Specialty } from '../Models/specialty';
import { ApplicationService } from './app-service';

@Injectable()
export class PhysiciansService {

    specialtyTypeList: Specialty[] = [];
    physicians: Physician[] = [{
        npi: 1,
        FirstName: "John",
        LastName: "Dough",
        Specialty: "Cardiology"
    },
    {
        npi: 2,
        FirstName: "Jane",
        LastName: "Dough",
        Specialty: "Neurology" 
    },
    {
        npi: 3,
        FirstName: "Spencer",
        LastName: "James",
        Specialty: "Orthopedics" 
    },
    {
        npi: 1,
        FirstName: "John",
        LastName: "Dough",
        Specialty: "Cardiology"
    },
    {
        npi: 2,
        FirstName: "Jane",
        LastName: "Dough",
        Specialty: "Neurology" 
    },
    {
        npi: 3,
        FirstName: "Spencer",
        LastName: "James",
        Specialty: "Orthopedics" 
    },
    {
        npi: 1,
        FirstName: "John",
        LastName: "Dough",
        Specialty: "Cardiology"
    },
    {
        npi: 2,
        FirstName: "Jane",
        LastName: "Dough",
        Specialty: "Neurology" 
    },
    {
        npi: 3,
        FirstName: "Spencer",
        LastName: "James",
        Specialty: "Orthopedics" 
    }
]
    
    constructor(private appService: ApplicationService) {

    }

    getSpecialtyTypes() {
        this.appService.getSpecialtyTypes().subscribe(x => this.specialtyTypeList = x);
    }
}