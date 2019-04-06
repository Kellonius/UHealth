import { Injectable } from '@angular/core';
import { Facility } from '../Models/facility';

@Injectable()
export class FacilityService{
    
    facilities: Facility[] = [{
        FacilityKey: 1,
        FacilityName: "Saint Francis",
        Address: "1234 Something St.",
        City: "Cape Girardeau",
        State: "MO",
        Zipcode: 63701,
        TypeSkey: 1,
        County: "Cape County",
        Latitude: 37.225136,
        Longitude: -89.569305,
        Selected: false
    },
    {
        FacilityKey: 2,
        FacilityName: "Southeast Health",
        Address: "5678 Another St.",
        City: "Cape Girardeau",
        State: "MO",
        Zipcode: 63701,
        TypeSkey: 1,
        County: "Cape County",
        Latitude: 37.325136,
        Longitude: -89.669305,
        Selected: false
    }]
    
    constructor(){

    }

    selectFacility(facility: Facility, index: number) {
        this.facilities[index].Selected = !this.facilities[index].Selected;
    }

    selectedCount() {
        let count = 0
        this.facilities.forEach(x => {
            if (x.Selected)
                count += 1
        })
        return count;
    }

}