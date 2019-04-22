using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uHealthSearchService.Models.FilterModels
{
    public class FacilityTypesFilter
    {
        public int? FacilityKey { get; set; }
        public int? FacilityTypeKey { get; set; }
        public string FacilityType { get; set; }
    }
}