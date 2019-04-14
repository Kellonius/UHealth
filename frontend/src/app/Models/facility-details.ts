import { Facility } from './facility';
import { Insurance } from './insurance';
import { Physician } from './physician';
import { ProcedureStatistics } from './procedure-statistics';
import { Specialty } from './specialty';

export class FacilityDetails {
    facility: Facility;
    insurance: Insurance[];
    physicians: Physician[];
    procedures: ProcedureStatistics[];
    specialties: Specialty[];
}