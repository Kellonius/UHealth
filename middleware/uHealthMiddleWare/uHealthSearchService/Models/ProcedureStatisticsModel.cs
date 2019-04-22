using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uHealthSearchService.Models
{
    public class ProcedureStatisticsModel
    {
        public string ProcedureDescr { get; set; }
        public int? FacilitySKey { get; set; }
        public string ProcedureCode { get; set; }
        public decimal? AvgTotalCost { get; set; }
        public int? AvgLos { get; set; }
        public decimal? MortalityRate { get; set; }
        public decimal? MajorComplicationRate { get; set; }
        public decimal? MinorComplicationRate { get; set; }
        public decimal? ReadmissionRate { get; set; }
        public int Count { get; set; }
    }
}