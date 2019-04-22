import { Injectable } from '@angular/core';
import { ProcedureStatistics } from '../Models/procedure-statistics';
import { Procedure } from '../Models/procedure';
import { ApplicationService } from './app-service';

@Injectable()
export class ProcedureStatisticsService {

    public procedureTypesList: Procedure[] = [];
    public procedureTypesListFiltered: Procedure[] = [];

    statistics: ProcedureStatistics[] = []

    constructor(private appService: ApplicationService) {

    }

    clearTypes() {
        this.procedureTypesListFiltered = [];
    }

    clearTypesForFilter(procedure: Procedure) {
        this.procedureTypesListFiltered = [];
        if (procedure) {
            this.procedureTypesListFiltered.push(procedure);
        }
    }

    getProcedureTypes() {
        this.appService.getProcedureTypes().subscribe(x => this.procedureTypesList = x);
    }

    getProcedureTypesByZip(zip: string) {
        this.appService.getProceduresByZipCode(zip).subscribe(x => this.procedureTypesListFiltered = x)
    }

    getProcedureTypesByKey(key: number) {
        this.procedureTypesListFiltered = [];
        this.appService.getProceduresByKey(key).subscribe(x => {
            x.forEach(y => {
                this.procedureTypesListFiltered.push(y);
            });
        });
    }

    getFacilityTypesForFilter(procedures: Procedure[]) {
        procedures.forEach(x => {
            this.procedureTypesList.forEach(y => {
                if (x.Code === y.Code) {
                    let p: Procedure = y;
                    if (!this.procedureTypesList.includes(p)) {
                        this.procedureTypesListFiltered.push(y);
                    }
                };
            });
        });
    }

    getProcedureStatisticsByKey(key: number) {
        this.appService.getProcedureStatisticsByKey(key).subscribe(x => this.statistics = x)
    }

}