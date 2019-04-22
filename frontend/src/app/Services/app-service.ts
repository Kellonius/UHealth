import { HttpClient, HttpParams } from '@angular/common/http';
import { FacilityTypes } from '../Models/facility-types';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Insurance } from '../Models/insurance';
import { Procedure } from '../Models/procedure';
import { Specialty } from '../Models/specialty';
import { Facility } from '../Models/facility';
import { geocode } from '../Models/geocode';
import { ProcedureStatistics } from '../Models/procedure-statistics';
import { Physician } from '../Models/physician';
import { FacilityTypesFilter } from '../Models/Filter Models/facility-types-filter';

@Injectable()
export class ApplicationService {

    public serviceApi: string = 'http://localhost:56621/Facility/';
    public geocodeApi: string = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    public getFilterMapEndPoint: string = 'GetFilterMap';

    public getFacilityTypesEndPoint: string = 'GetFacilityTypes';
    public getInsuranceTypesEndPoint: string = 'GetInsuranceTypes';
    public getProcedureTypesEndPoint: string = 'GetProcedureTypes';
    public getSpecialtyTypesEndPoint: string = 'GetSpecialtyTypes';

    public getFacilitiesListByZipcodeEndPoint: string = 'GetFacilitiesByZipcode';
    public getFacilityTypeListByZipcodeEndPoint: string = 'GetFacilityTypesByZip';
    public getInsuranceListByZipcodeEndPoint: string = 'GetInsuranceTypesByZip';
    public getProcedureListByZipcodeEndPoint: string = 'GetProcedureTypesByZip';
    public getSpecialtyListByZipcodeEndPoint: string = 'GetSpecialtyTypesByZip';

    public getSpecialtyListByKeyEndPoint: string = 'GetSpecialtyTypesByKey';
    public getProcedureListByKeyEndPoint: string = 'GetProcedureTypesByKey';
    public getInsuranceListByKeyEndPoint: string = 'GetInsuranceTypesByKey';
    public getFacilityListByKeyEndPoint: string = 'GetFacilityTypesByKey';

    public getProcedureStatisticsByKeyEndPoint: string = 'GetProcedureStatisticsByKey';
    public getPhysiciansByKeyEndPoint: string = 'GetPhysiciansByKey';
    public getFacilityByKeyEndPoint: string = 'GetFacilityByKey';

    public getFacilityTypesForFilterEndPoint: string = 'GetFacilityTypesForFilter';


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
        const params = new HttpParams().set('zip', zip);
        return this.http.get<Facility[]>(this.serviceApi + this.getFacilitiesListByZipcodeEndPoint, { params })
    }

    getFacilityByKey(key: number): Observable<Facility> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<Facility>(this.serviceApi + this.getFacilityByKeyEndPoint, { params })     
    } 

    getFacilityTypesByZipCode(zip: string): Observable<FacilityTypes[]> {
        const params = new HttpParams().set('zip', zip);
        return this.http.get<FacilityTypes[]>(this.serviceApi + this.getFacilityTypeListByZipcodeEndPoint, { params })
    }

    getInsuranceByZipCode(zip: string): Observable<Insurance[]> {
        const params = new HttpParams().set('zip', zip);
        return this.http.get<Insurance[]>(this.serviceApi + this.getInsuranceListByZipcodeEndPoint, { params })
    }

    getProceduresByZipCode(zip: string): Observable<Procedure[]> {
        const params = new HttpParams().set('zip', zip);
        return this.http.get<Procedure[]>(this.serviceApi + this.getProcedureListByZipcodeEndPoint, { params })
    }

    getSpecialtiesByZipCode(zip: string): Observable<Specialty[]> {
        const params = new HttpParams().set('zip', zip);
        return this.http.get<Specialty[]>(this.serviceApi + this.getSpecialtyListByZipcodeEndPoint, { params })
    }

    getFacilityTypesByKey(key: number): Observable<FacilityTypes[]> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<FacilityTypes[]>(this.serviceApi + this.getFacilityListByKeyEndPoint, { params })
    }

    getInsuranceByKey(key: number): Observable<Insurance[]> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<Insurance[]>(this.serviceApi + this.getInsuranceListByKeyEndPoint, { params })
    }

    getProceduresByKey(key: number): Observable<Procedure[]> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<Procedure[]>(this.serviceApi + this.getProcedureListByKeyEndPoint, { params })
    }

    getSpecialtiesByKey(key: number): Observable<Specialty[]> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<Specialty[]>(this.serviceApi + this.getSpecialtyListByKeyEndPoint, { params })
    }

    getAddress(address: string, city: string, state: string, zip: string): Observable<geocode> {
        return this.http.get<geocode>(this.geocodeApi + address + "+" + city + "+" + state + "+" + zip + "&key=AIzaSyBLrZp-nIhyRk--YUCPpBX5ogwe52A8bkQ")
    }

    getProcedureStatisticsByKey(key: number): Observable<ProcedureStatistics[]> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<ProcedureStatistics[]>(this.serviceApi + this.getProcedureStatisticsByKeyEndPoint, {params})
    }

    getPhysiciansByKey(key: number): Observable<Physician[]> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<Physician[]>(this.serviceApi + this.getPhysiciansByKeyEndPoint, {params})
    }

    filterMap(facilityType: FacilityTypes, insuranceType: Insurance, procedureType: Procedure, specialtyType: Specialty, zip: string): Observable<Facility[]> {
        let ftp: string;
        let itp: string;
        let ptp: string;
        let stp: string;
        if (facilityType && facilityType.FacilityTypeKey) {
            ftp = facilityType.FacilityTypeKey.toString()
        } else {
            ftp = ''
        }
        if (insuranceType && insuranceType.InsuranceSKey) {
            itp = insuranceType.InsuranceSKey.toString()
        } else {
            itp = ''
        }
        if (procedureType && procedureType.Code){
            ptp = procedureType.Code
        } else {
            ptp = ''
        }
        if (specialtyType && specialtyType.SpecialtySKey){
            stp = specialtyType.Description
        } else {
            stp = ''
        }
        const params = new HttpParams().set('facilityTypeSkey', ftp)
            .set('insuranceTypeSkey', itp)
            .set('procedureCode', ptp)
            .set('specialtyTypeSkey', stp)
            .set('zip', zip);

        return this.http.get<Facility[]>(this.serviceApi + this.getFilterMapEndPoint, { params })
    }

    getFacilityTypesForFilter(key: number): Observable<FacilityTypesFilter> {
        const params = new HttpParams().set('key', key.toString());
        return this.http.get<FacilityTypesFilter>(this.serviceApi + this.getFacilityTypesForFilterEndPoint, { params })
    }

}