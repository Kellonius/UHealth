import { HttpClient } from '@angular/common/http';
import { FacilityTypes } from '../Models/facility-types';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Insurance } from '../Models/insurance';
import { Procedure } from '../Models/procedure';
import { Specialty } from '../Models/specialty';

@Injectable()
export class ApplicationService {

    public serviceApi: string = 'http://localhost:56621/Facility/';
    public getFacilityTypesEndPoint: string = 'GetFacilityTypes';
    public getInsuranceTypesEndPoint: string = 'GetInsuranceTypes';
    public getProcedureTypesEndPoint: string  = 'GetProcedureTypes';
    public getSpecialtyTypesEndPoint: string = 'GetSpecialtyTypes';

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

}