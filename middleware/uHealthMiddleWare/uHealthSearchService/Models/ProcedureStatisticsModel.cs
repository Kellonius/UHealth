using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uHealthSearchService.Models
{
    public class ProcedureStatisticsModel
    {
        public string ProcedureDescr { get; set; }
        public decimal? AvgTotalCost { get; set; }
        public int? AvgLos { get; set; }
        public int? MortalityRate { get; set; }
        public int? MajorComplicationRate { get; set; }
        public int? MinorComplicationRate { get; set; }
        public int? ReadmissionRate { get; set; }
    }
}