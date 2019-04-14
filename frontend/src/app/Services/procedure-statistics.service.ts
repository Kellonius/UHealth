import { Injectable } from '@angular/core';
import { ProcedureStatistics } from '../Models/procedure-statistics';
import { Procedure } from '../Models/procedure';
import { ApplicationService } from './app-service';

@Injectable()
export class ProcedureStatisticsService {

    public procedureTypesList: Procedure[] = [];

    statistics: ProcedureStatistics[] = [{
        ProcedureDescr: "Heart Transplant",
        AvgTotalCost: 14000,
        AvgLos: 7,
        MortalityRate: 50,
        MajorComplicationRate: 50,
        MinorComplicationRate: 10,
        ReadmissionRate: 25
    },
    {
        ProcedureDescr: "Heart Bypass",
        AvgTotalCost: 9000,
        AvgLos: 7,
        MortalityRate: 50,
        MajorComplicationRate: 50,
        MinorComplicationRate: 10,
        ReadmissionRate: 25
    },
    {
        ProcedureDescr: "Colonoscopy",
        AvgTotalCost: 2328,
        AvgLos: 1,
        MortalityRate: 0,
        MajorComplicationRate: 0,
        MinorComplicationRate: 10,
        ReadmissionRate: 0
    },
    {
        ProcedureDescr: "Heart Transplant",
        AvgTotalCost: 14000,
        AvgLos: 7,
        MortalityRate: 50,
        MajorComplicationRate: 50,
        MinorComplicationRate: 10,
        ReadmissionRate: 25
    },
    {
        ProcedureDescr: "Heart Bypass",
        AvgTotalCost: 9000,
        AvgLos: 7,
        MortalityRate: 50,
        MajorComplicationRate: 50,
        MinorComplicationRate: 10,
        ReadmissionRate: 25
    },
    {
        ProcedureDescr: "Colonoscopy",
        AvgTotalCost: 2328,
        AvgLos: 1,
        MortalityRate: 0,
        MajorComplicationRate: 0,
        MinorComplicationRate: 10,
        ReadmissionRate: 0
    }
]

    constructor(private appService: ApplicationService) {

    }

    getProcedureTypes() {
        this.appService.getProcedureTypes().subscribe(x => this.procedureTypesList = x);
    }

}