import { HttpClient, HttpParams } from '@angular/common/http';
import { FacilityTypes } from '../Models/facility-types';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Insurance } from '../Models/insurance';
import { Procedure } from '../Models/procedure';
import { Specialty } from '../Models/specialty';
import { Facility } from '../Models/facility';
import { geocode } from '../Models/geocode';

@Injectable()
export class ApplicationService {

    public serviceApi: string = 'http://localhost:56621/Facility/';
    public geocodeApi: string= 'https://maps.googleapis.com/maps/api/geocode/json?address='
    public getFacilityTypesEndPoint: string = 'GetFacilityTypes';
    public getInsuranceTypesEndPoint: string = 'GetInsuranceTypes';
    public getProcedureTypesEndPoint: string  = 'GetProcedureTypes';
    public getSpecialtyTypesEndPoint: string = 'GetSpecialtyTypes';
    public getFacilitiesListByZipcodeEndPoint: string = 'GetFacilitiesByZipcode';


    constructor(private http: HttpClient) {

    }

    getFacilityTypes(): Observable<FacilityTypes[]> {
        return this.http.get<FacilityTypes[]>(this.serviceApi + this.getFacilityTypesEndPoint);
    }

    getInsuranceTypes(): Observable<Insurance[]> {
        return this.http.get<Insurance[]>(this.serviceApi + this.getInsuranceTypesEndPoint);
    }

    getProcedureTypes(): Observable<Procedure[]> {
        return this.http.get<Procedure[]>(this.serviceApi + this.getProcedureTypesEndPoint);
    }

    getSpecialtyTypes(): Observable<Specialty[]> {
        return this.http.get<Specialty[]>(this.serviceApi + this.getSpecialtyTypesEndPoint);
    }

    getFacilitiesByZipcode(zip: string): Observable<Facility[]> {
        const  params = new  HttpParams().set('zip', zip);
        return this.http.get<Facility[]>(this.serviceApi + this.getFacilitiesListByZipcodeEndPoint, {params})
    }
    getAddress(address: string, city: string, state: string, zip: string): Observable<geocode> {
        return this.http.get<geocode>(this.geocodeApi + address + "+" + city + "+" + state + "+" + zip + "&key=AIzaSyBLrZp-nIhyRk--YUCPpBX5ogwe52A8bkQ")
    }

}