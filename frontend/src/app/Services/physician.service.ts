import { Injectable } from '@angular/core';
import { Physician } from '../Models/physician';

@Injectable()
export class PhysiciansService {

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
    
    constructor() {

    }
}