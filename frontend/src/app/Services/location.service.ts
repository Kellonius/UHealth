import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facility } from '../Models/facility';
import { SharedService } from './shared.service';

@Injectable()
export class LocationService{

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

    addMarker(x: Facility) {
        this.markers.push({
            lat: x.Latitude,
            lng: x.Longitude,
            label: this.sharedService.getLetter(this.markers.length),
            draggable: false,
            info: x.FacilityName + ", Hospital"
        })
    }

    clearMarkers(){
        this.markers = [];
    }

}