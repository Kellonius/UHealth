import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facility } from '../Models/facility';
import { SharedService } from './shared.service';

@Injectable()
export class LocationService{
    // public serviceAPI: string = "http://localhost:8732/hack12/"
    // public getLocationEndPoint: string = "GetLocation?zipcode=";
    // public getFacilityEndPoint: string = "GetFacility?zipcode=";
    // public getSpecialtiesEndPoint: string = "GetSpecialties";
    // public getInsuranceEndPoint: string = "GetInsurance";
    // public getPhysiciansEndPoint: string = "GetPhysicians";
    // public getProceduresEndPoint: string = "GetProcedureCodes";
    // public getFacilityTypesEndPoint: string="GetFacilityTypes";
    // public getFacilityFilterEndPoint: string="GetFacilityFilt?zipCode="
    // public getProcedureStatsEndPoint: string ="GetProcedureStats?facilitySkey="

    lat: number = 37.3059;
    lng: number = -89.5181;
    
    markers: marker[] = [];
    
    constructor(public sharedService: SharedService){

    }

    createMarkers(facilities: Facility[]) {
        this.markers = [];
        let index = 0
        facilities.forEach(x => {
            this.markers.push({
                lat: x.Latitude,
                lng: x.Longitude,
                label: this.sharedService.getLetter(index),
                draggable: false,
                info: x.FacilityName + ", Hospital"
            })
            index +=1;
        })
    }

}