using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uHealthSearchService.Models
{
    public class FacilityDetails
    {
        public FacilityModel facility { get; set; }
        public List<InsuranceTypesModel> insurance { get; set; }
        public List<ProcedureTypes> procedures { get; set; }
        public List<SpecialtyTypes> specialties { get; set; }
        public List<PhysicianModel> physicians { get; set; }
        public ProcedureStatisticsModel statistics { get; set; }
        public FacilityTypesModel facilityType { get; set; }
    }
}