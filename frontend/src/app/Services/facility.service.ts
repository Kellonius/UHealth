import { Injectable } from '@angular/core';
import { Facility } from '../Models/facility';
import { ApplicationService } from './app-service';
import { LocationService } from './location.service';
import { GeocodeService } from './geocode-service';
import { FacilityTypesService } from './facility-types.service';
import { FacilityTypes } from '../Models/facility-types';
import { Insurance } from '../Models/insurance';
import { Procedure } from '../Models/procedure';
import { Specialty } from '../Models/specialty';
import { PhysiciansService } from './physician.service';
import { InsuranceService } from './insurance.service';
import { ProcedureStatisticsService } from './procedure-statistics.service';
import { FilterService } from './filter-services';

@Injectable()
export class FacilityService {

    selectedFacilities: Facility[] = []
    facilities: Facility[] = []
    facility: Facility

    constructor(private appservice: ApplicationService, private locationService: LocationService, private facilityTypesService: FacilityTypesService, private physicianService: PhysiciansService, private insuranceService: InsuranceService,
        private procedureService: ProcedureStatisticsService, private filterService: FilterService) {

    }

    selectFacility(facility: Facility, index: number) {
        if (!this.facilities[index].Selected) {
            this.selectedFacilities.push(this.facilities[index]);
        } else {
            this.selectedFacilities.splice(this.selectedFacilities.indexOf(this.facilities[index]));
        }
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
                    x.Latitude = y.results[0].geometry.location.lat;
                    x.Longitude = y.results[0].geometry.location.lng;
                    this.locationService.addMarker(x);
                    this.locationService.updateCoordinates(this.facilities[0].Latitude, this.facilities[0].Longitude);
                })
            });
            this.filterService.getFilters(this.facilities);
        });
    }

    filterMap(facilityType: FacilityTypes, insuranceType: Insurance, procedureType: Procedure, specialtyType: Specialty, zip: string) {
        this.appservice.filterMap(facilityType, insuranceType, procedureType, specialtyType, zip).subscribe(x => {
            this.facilities = [];
            this.facilities = x;
            this.locationService.clearMarkers();
            // this.physicianService.clearTypesForFilter(specialtyType);
            // this.insuranceService.clearTypesForFilter(insuranceType);
            // this.procedureService.clearTypesForFilter(procedureType);
            // this.facilityTypesService.clearTypesForFilter(facilityType);
            this.facilities.forEach(x => {
                this.appservice.getAddress(x.Address, x.City, x.State, x.Zipcode.toString()).subscribe(y => {
                    x.Latitude = y.results[0].geometry.location.lat;
                    x.Longitude = y.results[0].geometry.location.lng;
                    this.locationService.addMarker(x);
                    this.locationService.updateCoordinates(this.facilities[0].Latitude, this.facilities[0].Longitude);
                })
                // this.insuranceService.getInsuranceTypesByKey(x.FacilityKey);
                // this.physicianService.getSpecialyTypesByKey(x.FacilityKey);
                // this.procedureService.getProcedureTypesByKey(x.FacilityKey);
                // this.facilityTypesService.getFacilityTypesByKey(x.TypeSkey);
            });
          })
    }

}