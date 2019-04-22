export class ProcedureStatistics {
    ProcedureDescr: string;
    ProcedureCode: string;
    AvgTotalCost: number;
    AvgLos: number;
    FacilitySKey: number;
    MortalityRate: number;
    MajorComplicationRate: number;
    MinorComplicationRate: number;
    ReadmissionRate: number;
}

export class ProcedureStatisticsArray {
    Statistics: ProcedureStatistics[];
}

export class ProcedureCompare {
    Procedurecode: string;
    ProcedureDescr: string;
    AvgTotalCost: number[];
    AvgLos: number[];
    MortalityRate: number[];
    MajorComplicationRate: number[];
    MinorComplicationRate: number[];
    ReadmissionRate: number[];
}