import { Injectable } from '@angular/core';
import { createClient, GoogleMapsClient } from '@google/maps';
import {} from 'googlemaps';


@Injectable()
export class GeocodeService {

    private geocoder: any;

    constructor() {
        
    }

    ngOnInit() {
        this.geocoder = new google.maps.Geocoder();
    }

    // geocodeAddress(address){//, resultsMap) {
    //     this.geocoder.geocode({'address': address}, function(results, status) {
    //       if (status.toString() === 'OK') {
    //         //resultsMap.setCenter(results[0].geometry.location);
    //         // var marker = new google.maps.Marker({
    //         //   map: resultsMap,
    //         //   position: results[0].geometry.location
    //         // });
    //         console.log(results[0].geometry.location)
    //       } else {
    //         alert('Geocode was not successful for the following reason: ' + status);
    //       }
    //     });
    //   }
}
