import { Injectable } from '@angular/core';
import { Facility } from '../Models/facility';
import { ApplicationService } from './app-service';
import { LocationService } from './location.service';
import { GeocodeService } from './geocode-service';

@Injectable()
export class FacilityService {

    selectedFacilities: Facility[] = []
    facilities: Facility[] = []
    // [{
    //     FacilityKey: 1,
    //     FacilityName: "Saint Francis",
    //     Address: "1234 Something St.",
    //     City: "Cape Girardeau",
    //     State: "MO",
    //     Zipcode: 63701,
    //     TypeSkey: 1,
    //     County: "Cape County",
    //     Latitude: 37.225136,
    //     Longitude: -89.569305,
    //     Selected: false
    // },
    // {
    //     FacilityKey: 2,
    //     FacilityName: "Southeast Health",
    //     Address: "5678 Another St.",
    //     City: "Cape Girardeau",
    //     State: "MO",
    //     Zipcode: 63701,
    //     TypeSkey: 1,
    //     County: "Cape County",
    //     Latitude: 37.325136,
    //     Longitude: -89.669305,
    //     Selected: false
    // }]

    constructor(private appservice: ApplicationService, private locationService: LocationService) {

    }

    selectFacility(facility: Facility, index: number) {
        if (!this.facilities[index].Selected) {
            this.selectedFacilities.push(this.facilities[index]);
        } else {
            this.selectedFacilities.splice(this.selectedFacilities.indexOf(this.facilities[index]));
        }
        console.log(this.selectedFacilities)
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

    getFacilitiesByZip(zip: string) {
        this.facilities = []
        this.locationService.clearMarkers();
        this.appservice.getFacilitiesByZipcode(zip).subscribe(x => {
            this.facilities = x; 
            this.facilities.forEach(x => {
                this.appservice.getAddress(x.Address, x.City, x.State, x.Zipcode.toString()).subscribe(y => {
                    console.log(y)
                    x.Latitude = y.results[0].geometry.location.lat;
                    x.Longitude = y.results[0].geometry.location.lng;
                    this.locationService.addMarker(x);
                })
            })
        });
    }

}